# tugas_pemweb_express
## Tampilan Awal Database
<img width="959" height="503" alt="database_before" src="https://github.com/user-attachments/assets/8399b8e5-47de-4cc9-9ae5-26b0e557b4ed" />

Ini tampilan awal database sebelum kita melakukan request apapun. Terlihat bahwa database di Prisma Studio masih kosong.

## Pengujian
### 1. POST
**A. Skenario Error**
Disini melakukan POST tanpa mendefinisikan harga produk
<img width="700" height="252" alt="image" src="https://github.com/user-attachments/assets/fbbe8ee3-5884-4387-982a-69172542b1dc" />

Terlihat 400 Bad Request dengan massege "Name dan price wajib diisi!"

**B. Skenario Sukses POST**
Melakukan POST dengan mendefinisikan nama dan harga produk
<img width="701" height="250" alt="image" src="https://github.com/user-attachments/assets/39e66e84-beef-4fd9-881e-f6fe4506fdcc" />

<img width="701" height="245" alt="image" src="https://github.com/user-attachments/assets/7fdee637-11b8-44f4-9d88-7eceaf4243c8" />

Terlihat 201 Created dan data yang kita tambahkan

### 2. GET
**Menampilkan seluruh data**

<img width="689" height="277" alt="image" src="https://github.com/user-attachments/assets/05d3fea0-e5ee-4303-babf-652766ba6567" />

Terlihat response 200 OK dan menampilkan array berisi semua produk dari database

### 3. PUT
**A. Skenario Error**
Melakukan update data dengan hanya mendefinisikan nama produk
<img width="691" height="271" alt="image" src="https://github.com/user-attachments/assets/901e94d7-6df1-4159-adee-bea4acdbdc1a" />

Terlihat 400 Bad Request dengan message ID, name, dan price wajib diisi!

**B. Skenario Berhasil PUT**
Melakukan update data dengan mendefinisikan data lengkap (ID, name, dan price)
<img width="701" height="271" alt="image" src="https://github.com/user-attachments/assets/9e070894-8f88-4d8d-86d0-1f4c57b33732" />

Terlihat 200 OK dengan menampilkan data baru yang di update

**> hasil di database**
<img width="959" height="204" alt="image" src="https://github.com/user-attachments/assets/5413c0c1-1750-487f-9bd3-d5cdaf21ef2b" />

### DELETE
Disini kita melakukan delete berdasarkan ID
<img width="704" height="189" alt="image" src="https://github.com/user-attachments/assets/00043657-0f57-40e7-a2b4-d497e12b849f" />

Terlihat 200 OK dengan message "Produk dengan ID 2 berhasil dihapus"

## Tampilan akhir database
<img width="631" height="154" alt="image" src="https://github.com/user-attachments/assets/b4308fd5-0ee7-4880-8d5c-a72258557dc1" />

Ini merupakan hasil akhir di database Prisma Studio setelah kita melakukan berbagai macam request. Terlihat hasil akhirnya yaitu satu data produk buku tulis hardcover dengan harga 25000.
