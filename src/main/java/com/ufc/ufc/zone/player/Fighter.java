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

    public void setStance(String stance) {
        this.stance = stance;
    }

    public String getFirst_name() {
        return firstName;
    }

    public void setFirst_name(String firstName) {
        this.firstName = firstName;
    }

    public String getLast_name() {
        return lastName;
    }

    public void setLast_name(String lastName) {
        this.lastName = lastName;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getReach() {
        return reach;
    }

    public void setReach(String reach) {
        this.reach = reach;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getLosses() {
        return losses;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }

    public int getDraws() {
        return draws;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }

    public String getBelt() {
        return belt;
    }

    public void setBelt(String belt) {
        this.belt = belt;
    }

    public float getSlpm() {
        return slpm;
    }

    public void setSlpm(float slpm) {
        this.slpm = slpm;
    }

    public String getStr_acc() {
        return strAcc;
    }

    public void setStr_acc(String strAcc) {
        this.strAcc = strAcc;
    }

    public float getSapm() {
        return sapm;
    }

    public void setSapm(float sapm) {
        this.sapm = sapm;
    }

    public String getStr_def() {
        return strDef;
    }

    public void setStr_def(String strDef) {
        this.strDef = strDef;
    }

    public float getTd_avg() {
        return tdAvg;
    }

    public void setTd_avg(float tdAvg) {
        this.tdAvg = tdAvg;
    }

    public String getTd_acc() {
        return tdAcc;
    }

    public void setTd_acc(String tdAcc) {
        this.tdAcc = tdAcc;
    }

    public String getTd_def() {
        return tdDef;
    }

    public void setTd_def(String tdDef) {
        this.tdDef = tdDef;
    }

    public float getSub_avg() {
        return subAvg;
    }

    public void setSub_avg(float subAvg) {
        this.subAvg = subAvg;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
