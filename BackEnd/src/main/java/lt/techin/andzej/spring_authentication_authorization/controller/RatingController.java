package lt.techin.andzej.spring_authentication_authorization.controller;

import lt.techin.andzej.spring_authentication_authorization.model.Rating;
import lt.techin.andzej.spring_authentication_authorization.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RatingController {

    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/ratings/{bookId}/{username}")
    public Rating addRating(@PathVariable Integer bookId, @PathVariable String username, @RequestParam Integer rating) {
        return ratingService.addRating(bookId, username, rating);
    }

    @GetMapping("/ratings/{bookId}")
    public Integer getBookRating(@PathVariable Integer bookId) {
        return ratingService.getBookRating(bookId);
    }

    @GetMapping("/ratings/{bookId}/{username}")
    public boolean checkIfUserAlreadyVoted(@PathVariable Integer bookId, @PathVariable String username) {
        return ratingService.checkIfUserAlreadyVoted(bookId, username);
    }

    @GetMapping("/ratings/{bookId}/count")
    public int getRatingsCount(@PathVariable Integer bookId) {
        return ratingService.getRatingsCount(bookId);
    }
}
