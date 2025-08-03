function showOrderForm() {
  document.getElementById('orderForm').style.display = 'block';
  document.getElementById('orderForm').scrollIntoView({ behavior: 'smooth' });
}

function selectAddressType(type) {
  document.getElementById('addressType').value = type;
  document.querySelectorAll('.address-option').forEach(option => {
    option.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');
}

function generateReferenceCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendToDiscord(orderData, referenceCode) {
  const webhookUrl = 'YOUR_DISCORD_WEBHOOK';
  const embed = {
    title: "🛒 New Order Received",
    // etc...
  };
  const payload = { embeds: [embed] };
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Error sending to Discord:', error);
  }
}

document.getElementById('orderFormData').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  if (!document.getElementById('addressType').value) {
    alert('Please select a delivery type');
    return;
  }
  const formData = new FormData(form);
  const orderData = Object.fromEntries(formData.entries());
  const referenceCode = generateReferenceCode();
  await sendToDiscord(orderData, referenceCode);
  document.getElementById('referenceCode').textContent = referenceCode;
  document.getElementById('successMessage').style.display = 'block';
  document.getElementById('orderForm').style.display = 'none';
});