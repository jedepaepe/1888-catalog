package com.example.catalog;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    private final ProductRepository repository;


    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/products")
    List<Product> fetch() {
        return repository.findAll();
    }

    @PostMapping("/products")
    Product create(@RequestBody Product product) {
        return repository.save(product);
    }

    @GetMapping("/products/{id}")
    Product get(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @PutMapping("/products/{id}")
    Product update(@RequestBody Product product, @PathVariable Long id) {

        return repository.findById(id)
                .map(p -> {
                    p.setLabel(product.getLabel());
                    p.setDescription(product.getDescription());
                    p.setPrice(product.getPrice());
                    p.setUnit(product.getUnit());
                    p.setStock(product.getStock());
                    return repository.save(p);
                })
                .orElseGet(() -> {
                    product.setId(id);
                    return repository.save(product);
                });
    }

    @DeleteMapping("/products/{id}")
    void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
