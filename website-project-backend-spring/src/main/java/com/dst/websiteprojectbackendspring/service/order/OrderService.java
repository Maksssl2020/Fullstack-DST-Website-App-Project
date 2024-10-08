package com.dst.websiteprojectbackendspring.service.order;

import com.dst.websiteprojectbackendspring.dto.order.OrderRequestDTO;
import com.dst.websiteprojectbackendspring.model.order.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    void saveOrder(Order order);
    Long saveOrder(OrderRequestDTO orderRequestDTO);
    Order findOrderById(Long id);
    List<Order> findAllOrders();
    List<Order> findOrdersByAuthenticatedCustomerId(Long userId);
    void updateOrder(Long orderId, String orderStatus);
    void deleteOrder(Long id);
}
