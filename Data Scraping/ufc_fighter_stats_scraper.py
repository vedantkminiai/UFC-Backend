#!/usr/bin/env python3
"""Scrape UFC fighter statistics into a flat CSV file."""

from __future__ import annotations

import argparse
import csv
import string
import sys
import time
from typing import Dict, Iterable, List
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE_URL = "http://www.ufcstats.com"
FIGHTER_LIST_URL = f"{BASE_URL}/statistics/fighters?char={{char}}"

REQUEST_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/123.0.0.0 Safari/537.36"
    )
}

CSV_COLUMNS = [
    "Player",
    "First",
    "Last",
    "Nickname",
    "Ht",
    "Wt",
    "Reach",
    "Stance",
    "DOB",
    "W",
    "L",
    "D",
    "Belt",
    "SLpM",
    "Str_Acc",
    "SApM",
    "Str_Def",
    "TD_Avg",
    "TD_Acc",
    "TD_Def",
    "Sub_Avg",
    "URL",
]


def clean_text(value: str) -> str:
    return " ".join(value.split())


def fetch_html(session: requests.Session, url: str) -> str:
    response = session.get(url, timeout=30)
    response.raise_for_status()
    return response.text


def parse_list_page(html: str) -> List[Dict[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    fighters: List[Dict[str, str]] = []

    for row in soup.select("table.b-statistics__table tbody tr"):
        cells = row.select("td")
        if len(cells) != 11:
            continue

        links = row.select("a[href]")
        if not links:
            continue

        fighter_url = urljoin(BASE_URL, links[0]["href"])
        values = [clean_text(cell.get_text(" ", strip=True)) for cell in cells]

        fighters.append(
            {
                "First": values[0],
                "Last": values[1],
                "Nickname": values[2],
                "Ht": values[3],
                "Wt": values[4],
                "Reach": values[5],
                "Stance": values[6],
                "W": values[7],
                "L": values[8],
                "D": values[9],
                "Belt": values[10],
                "URL": fighter_url,
            }
        )

    return fighters


def parse_detail_page(html: str) -> Dict[str, str]:
    soup = BeautifulSoup(html, "html.parser")
    stats: Dict[str, str] = {
        "DOB": "",
        "SLpM": "",
        "Str_Acc": "",
        "SApM": "",
        "Str_Def": "",
        "TD_Avg": "",
        "TD_Acc": "",
        "TD_Def": "",
        "Sub_Avg": "",
    }

    label_map = {
        "DOB:": "DOB",
        "SLpM:": "SLpM",
        "Str. Acc.:": "Str_Acc",
        "SApM:": "SApM",
        "Str. Def:": "Str_Def",
        "TD Avg.:": "TD_Avg",
        "TD Acc.:": "TD_Acc",
        "TD Def.:": "TD_Def",
        "Sub. Avg.:": "Sub_Avg",
    }

    for item in soup.select("li.b-list__box-list-item"):
        label_node = item.select_one("i.b-list__box-item-title")
        if not label_node:
            continue

        label = clean_text(label_node.get_text(" ", strip=True))
        key = label_map.get(label)
        if not key:
            continue

        text = clean_text(item.get_text(" ", strip=True))
        value = text.replace(label, "", 1).strip()
        stats[key] = value

    return stats


def build_rows(
    session: requests.Session, chars: Iterable[str], delay: float
) -> List[Dict[str, str]]:
    rows: List[Dict[str, str]] = []

    for char in chars:
        list_html = fetch_html(session, FIGHTER_LIST_URL.format(char=char))
        fighters = parse_list_page(list_html)

        for fighter in fighters:
            detail_html = fetch_html(session, fighter["URL"])
            fighter.update(parse_detail_page(detail_html))
            fighter["Player"] = clean_text(
                f"{fighter.get('First', '')} {fighter.get('Last', '')}"
            ).strip()
            rows.append({column: fighter.get(column, "") for column in CSV_COLUMNS})
            if delay:
                time.sleep(delay)

        if delay:
            time.sleep(delay)

    return rows


def write_csv(rows: List[Dict[str, str]], output_path: str) -> None:
    with open(output_path, "w", newline="", encoding="utf-8") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=CSV_COLUMNS)
        writer.writeheader()
        writer.writerows(rows)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Scrape UFC fighter stats into a flat CSV file."
    )
    parser.add_argument(
        "-o",
        "--output",
        default="ufc_fighter_stats.csv",
        help="Path for the output CSV file.",
    )
    parser.add_argument(
        "--chars",
        default=string.ascii_lowercase,
        help="Letters to scrape from the fighter index, e.g. 'abc' or 'xyz'.",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=0.15,
        help="Delay in seconds between requests.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    chars = list(dict.fromkeys(char.lower() for char in args.chars if char.isalpha()))
    if not chars:
        print("No valid letters were provided in --chars.", file=sys.stderr)
        return 1

    session = requests.Session()
    session.headers.update(REQUEST_HEADERS)

    try:
        rows = build_rows(session=session, chars=chars, delay=args.delay)
    except requests.RequestException as exc:
        print(f"Scrape failed: {exc}", file=sys.stderr)
        return 1

    write_csv(rows, args.output)
    print(f"Wrote {len(rows)} fighter rows to {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
