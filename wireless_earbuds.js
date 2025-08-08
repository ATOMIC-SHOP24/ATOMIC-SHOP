let selectedAddressType = '';

function showOrderForm() {
    document.getElementById('orderForm').style.display = 'block';
    document.getElementById('orderForm').scrollIntoView({ behavior: 'smooth' });
}

function selectAddressType(type) {
    selectedAddressType = type;
    document.getElementById('addressType').value = type;
    
    // Remove selected class from all options
    document.querySelectorAll('.address-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.target.classList.add('selected');
}

function generateReferenceCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendToDiscord(orderData, referenceCode) {
    const webhookUrl = 'https://discord.com/api/webhooks/1401663924960493579/vqmlaEifzPJHmvLgqYF3YbEweuaJ2cJNy3JjC81dMJpAf732H8eVuzOpMI93t_LpIVns';
    
    const embed = {
        title: "🛒 New Order Received",
        color: 0x667eea,
        fields: [
            {
                name: "👤 Customer Details",
                value: `**Name:** ${orderData.fullName}\n**Phone:** ${orderData.phoneNumber}`,
                inline: false
            },
            {
                name: "📍 Delivery Address",
                value: `**Province:** ${orderData.province}\n**City:** ${orderData.city}\n**Zone:** ${orderData.zone}\n**Address:** ${orderData.address}\n**Landmark:** ${orderData.landmark || 'Not provided'}\n**Type:** ${orderData.addressType.toUpperCase()}`,
                inline: false
            },
            {
                name: "💰 Payment Info",
                value: `**Reference Code:** ${referenceCode}\n**Amount:** 99 TK\n**bKash:** 01784638636`,
                inline: false
            }
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: "Order Management System"
        }
    };

    const payload = {
        embeds: [embed]
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error('Error sending to Discord:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('orderFormData').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!selectedAddressType) {
            alert('Please select a delivery type (Office or Home)');
            return;
        }

        const formData = new FormData(this);
        const orderData = Object.fromEntries(formData.entries());
        
        // Generate reference code
        const referenceCode = generateReferenceCode();
        
        // Send to Discord
        await sendToDiscord(orderData, referenceCode);
        
        // Show success message
        document.getElementById('referenceCode').textContent = referenceCode;
        document.getElementById('orderForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
    });
});