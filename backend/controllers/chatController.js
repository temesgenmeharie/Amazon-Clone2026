export const processChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message is required' });
        }

        const lowerMessage = message.toLowerCase();
        let reply = "I'm sorry, I didn't verify that. Could you please rephrase?";

        // Keyword matching for Amazon services
        if (lowerMessage.includes('prime')) {
            reply = "Amazon Prime offers fast, free delivery on millions of items, exclusive savings, and access to Prime Video, Music, and more.";
        } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
            reply = "You can return most items within 30 days of receipt of delivery. Go to 'Your Orders' to start a return.";
        } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
            reply = "Amazon offers various shipping options including Same-Day, One-Day, and Standard Shipping. Prime members get free shipping on eligible items.";
        } else if (lowerMessage.includes('track') || lowerMessage.includes('order')) {
            reply = "You can track your package by visiting 'Your Orders' and clicking on 'Track Package'.";
        } else if (lowerMessage.includes('payment') || lowerMessage.includes('card')) {
            reply = "We accept credit/debit cards, Amazon Gift Cards, and other payment methods. You can manage them in 'Your Account' -> 'Payments'.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
            reply = "You can contact our Customer Service 24/7 through the 'Customer Service' page at the bottom of the site.";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            reply = "Hello! How can I help you with Amazon services today?";
        }

        res.status(200).json({
            success: true,
            reply
        });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error processing chat'
        });
    }
};
