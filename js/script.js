// Mengambil semua elemen HTML dengan kelas 'tanah' dan 'tikus' serta elemen dengan kelas 'papan-skor'
const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');

let tanahSebelumnya; // Variabel untuk menyimpan tanah sebelumnya yang muncul
let selesai; // Variabel untuk menandakan apakah permainan sudah selesai atau belum
let skor; // Variabel untuk menyimpan skor permainan

// Fungsi untuk mengacak elemen 'tanah' yang akan muncul tikusnya
function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length); // Mengacak indeks tanah secara acak
    const tRandom = tanah[t]; // Memilih tanah berdasarkan indeks acak
    if (tRandom == tanahSebelumnya) { // Jika tanah yang dipilih sama dengan tanah sebelumnya
        randomTanah(tanah); // Lakukan pengacakan ulang
    }
    tanahSebelumnya = tRandom; // Menyimpan tanah yang dipilih ke variabel tanahSebelumnya
    return tRandom; // Mengembalikan tanah yang sudah diacak
}

// Fungsi untuk menghasilkan waktu acak untuk munculnya tikus
function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min); // Menghasilkan angka acak antara min dan max
}

// Fungsi untuk menampilkan tikus pada tanah secara acak
function munculkanTikus() {
    const tRandom = randomTanah(tanah); // Memilih tanah secara acak
    const wRandom = randomWaktu(500, 1300); // Menghasilkan waktu muncul tikus secara acak antara 500ms - 1000ms
    tRandom.classList.add('muncul'); // Menambahkan kelas 'muncul' pada tanah yang dipilih

    setTimeout(() => {
        tRandom.classList.remove('muncul'); // Menghapus kelas 'muncul' pada tanah setelah waktu tertentu
        if (!selesai) {
            munculkanTikus(); // Jika permainan belum selesai, lanjutkan menampilkan tikus secara acak
        }
    }, wRandom); // Menunggu waktu tertentu sebelum menghapus kelas 'muncul'
}

// Fungsi untuk memulai permainan
function mulai() {
    selesai = false; // Menandakan permainan belum selesai
    skor = 0; // Mengatur skor awal menjadi 0
    papanSkor.textContent = 0; // Menampilkan skor awal pada papan skor
    munculkanTikus(); // Memulai menampilkan tikus secara acak
    setTimeout(() => {
        selesai = true; // Setelah 10 detik, tandai permainan sebagai selesai
    }, 10000); // Setelah 10 detik (10000ms), permainan akan dianggap selesai
}

// Fungsi untuk menambah skor ketika tikus di klik
function pukul() {
    skor++; // Menambah skor setiap kali tikus diklik
    papanSkor.textContent = skor; // Menampilkan skor terbaru pada papan skor
    this.parentNode.classList.remove('muncul'); // Menghapus kelas 'muncul' pada elemen yang berisi tikus
}

// Loop untuk menambah event listener pada setiap tikus agar dapat di klik
tikus.forEach(t => {
    t.addEventListener('click', pukul); // Menambahkan event click pada setiap tikus
});
