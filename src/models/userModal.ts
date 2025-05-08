import db from '../db/index';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

const users: User[] = [
  { name: 'Bamba', email: 'bamba@gmail.com', password: 'bambaPassword' },
  { name: 'Mamor', email: 'mamor@gmail.com', password: 'MamorPassword' },
  { name: 'Aida', email: 'aida@gmail.com', password: 'aidaPassword' },
];

export async function setup(): Promise<void> {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "user" (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  for (const u of users) {
    await db.query(
      'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
      [u.name, u.email, u.password]
    );
  }

  console.log("User table created and populated.");
}

export async function list(): Promise<User[]> {
  const { rows } = await db.query('SELECT * FROM "user"');
  return rows;
}

export async function view(id: number): Promise<User | null> {
  const { rows } = await db.query('SELECT * FROM "user" WHERE id = $1', [id]);
  return rows.length ? rows[0] : null;
}

export async function add(user: User): Promise<void> {
  const { name, email, password } = user;
  await db.query(
    'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
    [name, email, password]
  );
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { rows } = await db.query('SELECT * FROM "user" WHERE email = $1', [email]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

// Run setup when this file is loaded (optional)
setup().catch(console.error);
