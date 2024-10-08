package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.product_size.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {

    List<ProductSize> findByProductId(Long productId);
}
