module.exports = async (req, res) => {
  // Only GET requests are allowed
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID;

    if (!keyId) {
      return res.status(500).json({
        success: false,
        message: "Razorpay Key ID is not configured"
      });
    }

    // Only the public Key ID is sent to the browser.
    // The Key Secret is never exposed.
    return res.status(200).json({
      key_id: keyId
    });

  } catch (error) {
    console.error("Config error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
