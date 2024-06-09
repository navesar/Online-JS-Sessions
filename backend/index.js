import express from "express"
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import db from "./database.js";

dotenv.config()

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(
	server,
	{
		cors: {
			origin: true,
			methods: ["GET"],
		}
	}
);

const port = process.env.PORT || 3000;


async function fetchCodeBlocks() {
	try {
		await db.connect();
		const result = await db.query(`SELECT * FROM ${process.env.DB_TABLE_NAME}`);
		return result.rows;
	} catch (error) {
		console.error('Error fetching code blocks:', error);
		throw error;
	} finally {
		await db.end();
	}
}

const codeBlocks = await fetchCodeBlocks();
codeBlocks.push({ id: codeBlocks.length + 1, title: "Empty code block", code: "" });
const roomSize = new Map();
codeBlocks.forEach((codeBlock) => roomSize.set(codeBlock.id, 0));

app.get('/code-blocks', (req, res) => res.status(200).json(codeBlocks));

io.on(
	'connection', (socket) => {
		socket.on('join_room', (room) => {
			roomSize.set(room, roomSize.get(room) + 1);
			socket.join(room);
			socket.emit('client_id', roomSize.get(room) - 1);
		});

		socket.on('leave_room', (room) => {
			socket.leave(room);
			if (roomSize.get(room) > 0) {
				roomSize.set(room, roomSize.get(room) - 1);
			}

		});
		socket.on('code_change', ({ room, code }) => {
			socket.to(room).emit("code_update", code);
		});

	}
);

server.listen(port, "0.0.0.0",() => console.log(`Server running on port ${port}`));
