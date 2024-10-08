package com.dst.websiteprojectbackendspring.model.cart_item;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.model.product_item.ProductItem;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
public class CartItem extends ProductItem {

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    private Cart cart;
}
