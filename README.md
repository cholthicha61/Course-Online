# การพัฒนาระบบการจัดการคอร์สออนไลน์

## การพัฒนาระบบการจัดการคอร์สออนไลน์ พัฒนาระบบด้วย 

### Back-end
- **Framework:** Next.js (สำหรับ API และ SSR)
#### ฟีเจอร์หลัก:
- การจัดการผู้ใช้ (Authentication, Authorization)
- การจัดการคอร์ส (CRUD: Create, Read, Update, Delete)
- การจัดการบทเรียนและเนื้อหา
- ระบบการลงทะเบียนคอร์ส
- API สำหรับให้ Front-End ดึงข้อมูล
#### เครื่องมือเพิ่มเติม:
- **Prisma:** ORM (Object-Relational Mapping) สำหรับจัดการฐานข้อมูล PostgreSQL
- **JWT:** สำหรับ Authentication

### ฐานข้อมูล
  - ใช้ฐานข้อมูล PostgreSQL
  - การตั้งค่าฐานข้อมูล: ใช้ Docker เพื่อสร้าง Container สำหรับ PostgreSQL
#### ตารางหลัก:
- `users`: ข้อมูลผู้ใช้งาน เช่น ผู้สอนและผู้เรียน
- `user_favorite_courses`: ข้อมูลการกดชื่นชอบคอร์ส
- `role`: บทบาทของผู้ใช้ แอดมิน อาจารย์ ผู้ใช้
- `question`: เก็บคำถามสำหรับผู้ใช้ และบุคคลทั่วไป
- `order`: ออเดอร์คอร์สที่ทำการซื้อเรียบร้อยแล้ว
- `courses`: ข้อมูลคอร์ส เช่น ชื่อคอร์ส, คำอธิบาย, ผู้สอน
- `image`: รูปภาพข้อมูลบทเรียน
- `category`: หมวดหมู่คอร์สเรียน


### Front-end
- **Framework:** HTML และ Vue.js
- **UI Framework:** ใช้ Tailwind CSS หรือ Vuetify
#### ฟีเจอร์: หน้าจอสำหรับผู้ใช้
- หน้าเข้าสู่ระบบ
- หน้าสมัครสมาชิก
- หน้าแรก
- หน้าแสดงคอร์สทั้งหมด
- หน้ารายละเอียดคอร์ส
- หน้าข้อมูลคอร์สของฉัน
- หน้าข้อมูลคอร์สที่สนใจ
- หน้าแก้ใขโปรไฟล์
- หน้าเปลี่ยนรหัสผ่าน
- หน้าแสดงรายละเอียดคอร์ส
- กล่องข้อความสำหรับสอบถามเพิ่มเติม
##### หน้าจอสำหรับแอดมินหรือผู้สอน
- หน้า Dashboard ของผู้สอนและผู้เรียน
- หน้า Inbox สำหรับตอบคำถามสำหรับผู้สอน
- หน้าจัดการคอร์ส
- หน้าเพิ่มคอร์ส
- หน้าแก้ไขคอร์ส (เพิ่ม, ลบ, แก้ไขหมวดหมู่)
- หน้าจัดการผู้ใช้
- หน้าจัดการหมวดหมู่ (เพิ่ม, ลบ, แก้ไขหมวดหมู่)
- หน้าแก้ไขข้อมูลอาจารย์ผู้สอน
- หน้าคอร์สออเดอร์
- หน้า Confirmed Course
- หน้า Cancel Course
- หน้า Comple Courser 
