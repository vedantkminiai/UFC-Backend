package com.ufc.ufc.zone.player;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/fighter")
public class FighterController {

    private final FighterService fighterService;

    @Autowired
    public FighterController(FighterService fighterService) {
        this.fighterService = fighterService;
    }

    @GetMapping
    public List<Fighter> getFighters(
        @RequestParam(required = false) String first_name,
        @RequestParam(required = false) String full_name,
        @RequestParam(required = false) String weight,
        @RequestParam(required = false) String height,
        @RequestParam(required = false) String stance) {

        if (stance != null){
            return fighterService.getFightersByStance(stance);
        }
        else if (first_name != null){
            return fighterService.getFightersByName(first_name);
        }
        else if (full_name != null){
            return fighterService.getFightersByFullName(full_name);
        }
        else if (height != null) {
            return fighterService.getFightersByHeight(height);
        }
        else if (weight != null) {
            return fighterService.getFightersByWeight(weight);
        } else {
            return fighterService.getFighters();
        }
    }

    @PostMapping
    public ResponseEntity<Fighter> addFighter(@RequestBody Fighter fighter) {
        Fighter createdFighter = fighterService.addFighter(fighter);
        return new ResponseEntity<>(createdFighter, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Fighter> updateFighter(@RequestBody Fighter fighter) {
        Fighter  resultFighter = fighterService.updateFighter(fighter);
        if (resultFighter != null) {
            return new ResponseEntity<>(resultFighter, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{fighterName}")
    public ResponseEntity<String> deleteFighter(@PathVariable String fighterName){
        fighterService.deleteFighter(fighterName);
        return new ResponseEntity<>("Player deleted successfully", HttpStatus.OK);
    }

}
