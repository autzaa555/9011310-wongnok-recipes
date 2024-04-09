-- SQLite
-- =============================================
-- อ่านตาราง
SELECT * FROM items
SELECT id, name FROM items WHERE id = 5
SELECT id, name FROM items WHERE name LIKE '%col%'

-- ==============================================
-- สร้างตารางข้อมูล
INSERT INTO items (name, description, img) VALUES ('Item1', 'Description of Item1', 'image.png');
-- ==============================================
-- อัพเดทตาราง
UPDATE items SET name = 'NewName', description = 'NewDescription', img = 'image222.png'WHERE id = 5;
-- ==============================================
UPDATE items
SET description = 'colum2'
WHERE id = 5;
-- ==============================================
-- ลบตาราง
DELETE FROM items WHERE id = 6;
DELETE FROM items WHERE name LIKE '%col%';
-- ==============================================
-- สร้างตารางใหม่sql create table menus by interface menu  in sql
CREATE TABLE menus (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    difficulty VARCHAR(255),
    period VARCHAR(255),
    description VARCHAR(255),
    step VARCHAR(255),
    img VARCHAR(255)
);
-- =============================================
-- ลบตาราง
DROP TABLE menus;