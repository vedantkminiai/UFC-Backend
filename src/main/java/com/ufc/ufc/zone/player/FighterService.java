package com.ufc.ufc.zone.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class FighterService {
    private final repository fighterRepository;

    @Autowired
    public FighterService(repository fighterRepository){
        this.fighterRepository = fighterRepository;
    }

    public List<Fighter> getFighters(){
        return fighterRepository.findAll();
    }

    public List<Fighter> getFightersByStance(String stance){
        return fighterRepository.findAll().stream()
                .filter(fighter -> stance.equals(fighter.getStance()))
                .collect(Collectors.toList());
    }

    public List<Fighter> getFightersByName(String searchText){
        return fighterRepository.findAll().stream()
                .filter(fighter -> fighter.getFirst_name().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Fighter> getFightersByFullName(String searchText){
        return fighterRepository.findAll().stream()
                .filter(fighter -> fighter.getFull_name().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Fighter> getFightersByHeight(String searchText){
        return fighterRepository.findAll().stream()
                .filter(fighter -> fighter.getHeight().contains(searchText))
                .collect(Collectors.toList());
    }

    public List<Fighter> getFightersByStanceAndWins(String stance, int wins){
        return fighterRepository.findAll().stream()
                .filter(fighter -> fighter.getStance().equals(stance) && fighter.getWins() >= wins)
                .collect(Collectors.toList());
    }

    public Fighter addFighter(Fighter fighter) {
        fighterRepository.save(fighter);
        return fighter;
    }

    public Fighter updateFighter(Fighter updatedFighter) {
        Optional<Fighter> existingFighter = fighterRepository.findByFullName(updatedFighter.getFull_name());

        if (existingFighter.isPresent()){
            Fighter fighterToUpdate = existingFighter.get();
            fighterToUpdate.setFull_name(updatedFighter.getFull_name());
            fighterToUpdate.setStance(updatedFighter.getStance());
            fighterToUpdate.setHeight(updatedFighter.getHeight());
            fighterToUpdate.setWeight(updatedFighter.getWeight());

            fighterRepository.save(fighterToUpdate);
            return fighterToUpdate;
        }
        return null;

    }

    @Transactional
    public void deleteFighter(String fighterName) {
        fighterRepository.deleteByFullName(fighterName);
    }

    public List<Fighter> getFightersByWeight(String weight) {
        return fighterRepository.findAll().stream()
                .filter(fighter -> fighter.getWeight().equals(weight))
                .collect(Collectors.toList());
    }
}
