const nodemailer = require("nodemailer");

const sendOrderEmail = async (order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 📧 Admin email
  const adminMail = {
    from: `"GreenPlant" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "🌱 New Order Received (Pending)",
    html: `
      <h3>New Order Pending</h3>
      <p><strong>Name:</strong> ${order.customerName}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Email:</strong> ${order.email || "N/A"}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Total:</strong> Rs. ${order.totalAmount}</p>
      <p>Status: <b>${order.status}</b></p>
    `,
  };

  // 📧 Customer email
  const customerMail = {
    from: `"GreenPlant" <${process.env.EMAIL_USER}>`,
    to: order.email,
    subject: "🌱 Order Received – GreenPlant",
    html: `
      <h3>Thank you for your order!</h3>
      <p>Your order has been received and is currently <b>Pending</b>.</p>
      <p>We will contact you shortly to confirm delivery.</p>
      <p><strong>Total Amount:</strong> Rs. ${order.totalAmount}</p>
      <br/>
      <p>– GreenPlant Team 🌱</p>
    `,
  };

  await transporter.sendMail(adminMail);

  if (order.email) {
    await transporter.sendMail(customerMail);
  }
};

module.exports = sendOrderEmail;
