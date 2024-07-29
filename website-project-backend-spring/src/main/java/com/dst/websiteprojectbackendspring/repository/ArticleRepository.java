package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.domain.article.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
}
