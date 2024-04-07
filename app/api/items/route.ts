// localhost:3000//api/items
// GET,POST,PUT,DELETE

import { Item } from "@/app/interface/item";
import { connectDB } from "@/app/connection/db";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  let items: Item[];

  try {
    const db = await connectDB();
    if (id) {
      items = await db.all(`SELECT * FROM items WHERE id = ${id}`);
    } else {
      items = await db.all("SELECT * FROM items");
    }
    return Response.json(items)
  } catch (error) {
    console.error("Error fetching items:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}


export async function POST(req: Request, res: Response) {
  const body = await req.json() as Item;
  
  try {
    // Destructure the body object to extract properties
    const { name, description, img } = body;

    // Perform data validation if needed
    if (!name || !description || !img) {
      throw new Error("Invalid data: name, description, and img are required.");
    }

    const db = await connectDB();
    const { lastID } = await db.run('INSERT INTO items (name, description, img) VALUES (?, ?, ?)', [name, description, img]);
    const newItem: Item = { id: lastID, name, description, img };
    return Response.json(newItem);

  } catch (error) {
    console.error("Error fetching items:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}


export async function DELETE(req: Request, res: Response) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  
  try {
    const db = await connectDB();
    
    if (id == null) {
      throw new Error("Invalid data: name, description, and img are required.");
    }

    const items: Item[] = await db.all(`SELECT * FROM items WHERE id = ${id}`);
    if (items.length != 1) {
      throw new Error(`Item id: ${id} not found`);
    }

    const result = await db.all(`DELETE FROM items WHERE id = ${id}`);
    console.log(result)
    return Response.json(items)
  } catch (error) {
    console.error("Error fetching items:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}



export async function PUT(req: Request, res: Response) {
  const body = await req.json() as Item;
  
  try {
    // Destructure the body object to extract properties
    const {id, name, description, img } = body;

    // Perform data validation if needed
    if (!id ||!name || !description || !img) {
      throw new Error("Invalid data: id, name, description, and img are required.");
    }

    // ('INSERT INTO items (name, description, img) VALUES (?, ?, ?)', [name, description, img]);

    const db = await connectDB();
    await db.run('UPDATE items SET name = ?, description = ?, img = ? WHERE id = ?', [name, description, img, id]);

    const newItem: Item = { id, name, description, img };
    return Response.json(newItem);

  } catch (error) {
    console.error("Error fetching items:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}