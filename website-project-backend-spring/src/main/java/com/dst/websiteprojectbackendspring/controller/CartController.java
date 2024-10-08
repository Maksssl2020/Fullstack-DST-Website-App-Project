package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.cart.CartDTO;
import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.service.cart.CartServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/shop/carts")
public class CartController {

    private final CartServiceImpl cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        return ResponseEntity.ok(cartService.getAllCarts());
    }

    @GetMapping("/{cartIdentifier}/id")
    public ResponseEntity<Long> getCartId(@PathVariable String cartIdentifier, @RequestParam("userRegistered") boolean isUserRegistered) {
        return ResponseEntity.ok(cartService.getCartIdByIdentifier(cartIdentifier, isUserRegistered));
    }

    @GetMapping("/{cartIdentifier}")
    public ResponseEntity<CartDTO> getCartByIdentifier(@PathVariable String cartIdentifier, @RequestParam("userRegistered") boolean isUserRegistered) {
        return ResponseEntity.ok(cartService.getCartDTOByIdentifier(cartIdentifier, isUserRegistered));
    }

    @GetMapping("/exist/{username}")
    public ResponseEntity<Boolean> isCartExist(@PathVariable String username) {
        return ResponseEntity.ok(cartService.existsByIdentifier(username));
    }

    @PutMapping("/assign-discount/{cartIdentifier}/{discountCodeId}")
    public ResponseEntity<HttpStatus> assignCodeToCart(@PathVariable String cartIdentifier, @PathVariable String discountCodeId) throws ChangeSetPersister.NotFoundException {
        cartService.assignCodeToCart(cartIdentifier, discountCodeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/apply-discount/{cartId}/{userId}")
    public ResponseEntity<HttpStatus> applyDiscount(@PathVariable Long cartId, @PathVariable Long userId) throws ChangeSetPersister.NotFoundException {
        cartService.applyDiscountCode(cartId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
