// localhost:3000//api/items
// GET,POST,PUT,DELETE

import { Menu } from "@/app/interface/menu";
import { connectDB } from "@/app/connection/db";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  let menus: Menu[];

  try {
    const db = await connectDB();
    if (id) {
      menus = await db.all(`SELECT * FROM menus WHERE id = ${id}`);
    } else {
      menus = await db.all("SELECT * FROM menus");
    }
    return Response.json(menus)
  } catch (error) {
    console.error("Error fetching menus:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}


export async function POST(req: Request, res: Response) {
  const body = await req.json() as Menu;
  
  try {
    // Destructure the body object to extract properties
    const { name, difficulty, period, description, step, img } = body;

    // Perform data validation if needed
    if (!name || !difficulty || !period  || !description || !step || !img) {
      throw new Error("Invalid data: name, difficulty, period, description, step, and img are required.");
    }

    const db = await connectDB();
    const { lastID } = await db.run('INSERT INTO menus (name, difficulty, period, description, step, img) VALUES (?, ?, ?, ?, ?, ?)', [name, difficulty, period, description, step, img]);
    const newItem: Menu = { id: lastID, name, difficulty, period, description, step, img };
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

    const menus: Menu[] = await db.all(`SELECT * FROM menus WHERE id = ${id}`);
    if (menus.length != 1) {
      throw new Error(`Item id: ${id} not found`);
    }

    const result = await db.all(`DELETE FROM menus WHERE id = ${id}`);
    // console.log(result)
    return Response.json(menus)
  } catch (error) {
    console.error("Error fetching menus:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}



export async function PUT(req: Request, res: Response) {
  const body = await req.json() as Menu;
  
  try {
    // Destructure the body object to extract properties
    const { name, difficulty, period, description, step, img,id } = body;

    // Perform data validation if needed
    if (!id || !name || !difficulty || !period  || !description || !step || !img ) {
      throw new Error("Invalid data: id, name, difficulty, period, description, step, and img are required.");
    }



    const db = await connectDB();
    await db.run('UPDATE menus SET name = ?, difficulty = ?, period = ?, description = ?, step = ?, img = ? WHERE id = ?', [name, difficulty, period, description, step, img, id ]);

    const newMenu: Menu = { id, name, difficulty, period, description, step, img};
    return Response.json(newMenu);

  } catch (error) {
    console.error("Error fetching menus:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}