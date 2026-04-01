package com.ufc.ufc.zone.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="player_statistic")
public class Fighter {
    @Id
    @Column(name = "player_name", unique = true)
    private String fullName;

    private String firstName;
    private String lastName;
    private String nickname;
    private String height;
    private String weight;
    private String reach;
    private String stance;

    private String dob;

    private int wins;
    private int losses;
    private int draws;

    private String belt;

    private float slpm;
    private String strAcc;
    private float sapm;
    private String strDef;

    private float tdAvg;
    private String tdAcc;
    private String tdDef;

    private float subAvg;

    private String url;

    public Fighter(String full_name, String firstName, String lastName, String nickname, String height, String weight, String reach, String stance, String dob, int wins, int losses, int draws, String belt, float slpm, String strAcc, float sapm, String strDef, float tdAvg, String tdAcc, String tdDef, float subAvg, String url) {
        this.fullName = full_name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.height = height;
        this.weight = weight;
        this.reach = reach;
        this.stance = stance;
        this.dob = dob;
        this.wins = wins;
        this.losses = losses;
        this.draws = draws;
        this.belt = belt;
        this.slpm = slpm;
        this.strAcc = strAcc;
        this.sapm = sapm;
        this.strDef = strDef;
        this.tdAvg = tdAvg;
        this.tdAcc = tdAcc;
        this.tdDef = tdDef;
        this.subAvg = subAvg;
        this.url = url;

    }

    public Fighter(String fullName) {
        this.fullName = fullName;
    }

    public Fighter() {

    }

    public String getFull_name() {
        return fullName;
    }

    public void setFull_name(String full_name) {
        this.fullName = full_name;
    }

    public String getStance() {
        return stance;
    }

    public String getFirst_name() {
        return firstName;
    }

    public String getHeight() {
        return height;
    }

    public String getWeight() {
        return weight;
    }

    public int getWins() {
        return wins;
    }

    public void setStance(String stance) {
        this.stance = stance;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public void setWeight(Object weight) {
        this.weight = (String) weight;
    }
}
