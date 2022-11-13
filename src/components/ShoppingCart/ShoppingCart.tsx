import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { CartItem } from "../CartItem/CartItem";

import storeItems from '../../data/items.json';

interface IShoppingCart {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: IShoppingCart) {
  const { closeCart, cartItems } = useShoppingCart();

  const total = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find(i => i.id === cartItem.id);
    return total + (item?.price || 0 )* cartItem.quantity;
  }, 0)

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total {formatCurrency(total)}
            </div>
          </Stack>
        </Offcanvas.Body>
    </Offcanvas>
  )
}