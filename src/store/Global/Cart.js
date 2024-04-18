export function addItemToCart(user, item, quantity, newUser = {}) {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        if (user && user.id) {
            const userCartIndex = cart.findIndex((c) => c.user_id === user.id);
            if (userCartIndex !== -1) {
                const existingItemIndex = cart[userCartIndex].items.findIndex((p) => p.product_id === item.product_id);
                if (existingItemIndex !== -1) {
                    cart[userCartIndex].items[existingItemIndex] = {
                        ...cart[userCartIndex].items[existingItemIndex],
                        variation_id: item.variation_id,
                        count: quantity,
                    };
                } else {
                    cart[userCartIndex].items.push({
                        ...item,
                        count: quantity,
                    });
                }
            } else {
                cart.push({
                    user_id: user.id,
                    items: [{
                        ...item,
                        count: quantity,
                    }],
                });
            }
        } else {
            const productIndex = cart.findIndex((p) => p.items.some((i) => i.product_id === item.product_id));

            if (productIndex !== -1) {
                const existingItemIndex = cart[productIndex].items.findIndex((i) => i.product_id === item.product_id);

                if (existingItemIndex !== -1) {
                    cart[productIndex].items[existingItemIndex] = {
                        ...cart[productIndex].items[existingItemIndex],
                        variation_id: item.variation_id,
                        count: quantity,
                    };
                } else {
                    const newItem = {
                        ...item,
                        count: quantity,
                    };
                    cart[productIndex].items.push(newItem);
                }
            } else {
                const newItem = {
                    ...item,
                    count: quantity,
                };
                const existingItemsIndex = cart.findIndex((c) => c.items.some((i) => i.product_id === item.product_id));

                if (existingItemsIndex !== -1) {
                    cart[existingItemsIndex].items.push(newItem);
                } else {
                    cart.push({
                        items: [newItem],
                    });
                }
            }
        }
        //concat the array of not logged in user
        if (!user || !user.id) {
            const flattenedItems = cart.reduce((acc, curr) => acc.concat(curr.items), []);
            cart = [{ items: flattenedItems }];
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        //set item for new user so we can register later
        if (newUser) {
            const checkNewUserInLocaStorage = JSON.parse(localStorage.getItem('new_user'))
            if (!checkNewUserInLocaStorage) {
                localStorage.setItem("new_user", JSON.stringify(newUser));
            }
        }
    }
}

export function getItemsFromCart(user) {
    let cart = [];

    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        if (user && user.id) {
            const userCartIndex = cart.findIndex((c) => c.user_id === user.id);
            if (userCartIndex !== -1) {
                return cart[userCartIndex].items;
            }
        } else {
            const notLoggedInCartIndex = cart.findIndex((c) => !c.user_id);
            if (notLoggedInCartIndex !== -1) {
                return cart[notLoggedInCartIndex].items;
            }
        }
    }

    return [];
}


export function calculateTotalAmountOfCart(user) {
    let cart = [];

    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        if (user && user.id) {
            const userCartIndex = cart.findIndex((c) => c.user_id === user.id);
            if (userCartIndex !== -1) {
                return cart[userCartIndex].items.reduce((total, item) => {
                    return total + item.price * item.count;
                }, 0);
            }
        } else {
            const notLoggedInCartIndex = cart.findIndex((c) => !c.user_id);
            if (notLoggedInCartIndex !== -1) {
                return cart[notLoggedInCartIndex].items.reduce((total, item) => {
                    return total + item.price * item.count;
                }, 0);
            }
        }
    }

    return 0;
}

export function updateCartItemQuantity(user, productId, quantity) {
    let cart = [];

    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        if (user && user.id) {
            const userCartIndex = cart.findIndex((c) => c.user_id === user.id);
            if (userCartIndex !== -1) {
                const itemIndex = cart[userCartIndex].items.findIndex((item) => item.product_id === productId);
                if (itemIndex !== -1) {
                    cart[userCartIndex].items[itemIndex].count = quantity;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    return true; // Quantity updated successfully
                }
            }
        } else {
            const notLoggedInCartIndex = cart.findIndex((c) => !c.user_id);
            if (notLoggedInCartIndex !== -1) {
                const itemIndex = cart[notLoggedInCartIndex].items.findIndex((item) => item.product_id === productId);
                if (itemIndex !== -1) {
                    cart[notLoggedInCartIndex].items[itemIndex].count = quantity;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    return true; // Quantity updated successfully
                }
            }
        }
    }

    return false; // Unable to update quantity (product not found or other issue)
}


export function deleteCartItem(user, productId) {
    let cart = [];

    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        if (user && user.id) {
            const userCartIndex = cart.findIndex((c) => c.user_id === user.id);
            if (userCartIndex !== -1) {
                const itemIndex = cart[userCartIndex].items.findIndex((item) => item.product_id === productId);
                if (itemIndex !== -1) {
                    cart[userCartIndex].items.splice(itemIndex, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    return true; // Item deleted successfully
                }
            }
        } else {
            const notLoggedInCartIndex = cart.findIndex((c) => !c.user_id);
            if (notLoggedInCartIndex !== -1) {
                const itemIndex = cart[notLoggedInCartIndex].items.findIndex((item) => item.product_id === productId);
                if (itemIndex !== -1) {
                    cart[notLoggedInCartIndex].items.splice(itemIndex, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    return true; // Item deleted successfully
                }
            }
        }
    }

    return false; // Unable to delete item (product not found or other issue)
}


export function deleteAllCartItems(user) {
    let cart = [];

    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        if (user && user.id) {
            const userCartIndex = cart.findIndex((c) => c.user_id === user.id);
            if (userCartIndex !== -1) {
                cart[userCartIndex].items = [];
                localStorage.setItem("cart", JSON.stringify(cart));
                return true; // All items deleted successfully
            }
        } else {
            const notLoggedInCartIndex = cart.findIndex((c) => !c.user_id);
            if (notLoggedInCartIndex !== -1) {
                cart[notLoggedInCartIndex].items = [];
                localStorage.setItem("cart", JSON.stringify(cart));
                return true; // All items deleted successfully
            }
        }
    }

    return false; // Unable to delete items (cart not found or other issue)
}





