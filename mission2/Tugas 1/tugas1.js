const items = document.querySelectorAll('.item');
        const decrementButtons = document.querySelectorAll('.kurang');
        const incrementButtons = document.querySelectorAll('.tambah');
        const quantityElements = document.querySelectorAll('.quantity');
        const addToCartButtons = document.querySelectorAll('.addToCart');

        let totalItems = 0;
        let totalPrice = 0;

        decrementButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const quantity = parseInt(quantityElements[index].textContent);
                if (quantity > 0) {
                    quantityElements[index].textContent = quantity - 1;
                    totalItems--;
                    totalPrice -= (index + 1) * 10000;
                    updateCartSummary();
                }
            });
        });

        incrementButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const quantity = parseInt(quantityElements[index].textContent);
                quantityElements[index].textContent = quantity + 1;
                totalItems++;
                totalPrice += (index + 1) * 10000;
                updateCartSummary();
            });
        });

        addToCartButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const quantity = parseInt(quantityElements[index].textContent);
                quantityElements[index].textContent = '0';
                updateCartSummary();
            });
        });

        function updateCartSummary() {
            const taxRate = 0.11;
            const tax = totalPrice * taxRate;
            const totalPayable = totalPrice + tax;

            document.getElementById('totalItems').textContent = totalItems;
            document.getElementById('totalPrice').textContent = formatCurrency(totalPrice);
            document.getElementById('tax').textContent = formatCurrency(tax);
            document.getElementById('totalPayable').textContent = formatCurrency(totalPayable);
        }

        function formatCurrency(amount) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
        }

        // Tambahkan event listener untuk tombol "Hapus"
        items.forEach((item, index) => {
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Hapus';
            removeButton.className = 'remove';
            item.appendChild(removeButton);

            removeButton.addEventListener('click', () => {
                const quantity = parseInt(quantityElements[index].textContent);
                totalItems -= quantity;
                totalPrice -= (index + 1) * 10000 * quantity;
                quantityElements[index].textContent = '0';
                updateCartSummary();
            });
        });