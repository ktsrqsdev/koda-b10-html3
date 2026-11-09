const STORAGE_KEY = "dataPerokok";

function ambilData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

const formPerokok = document.getElementById("formPerokok");

if (formPerokok) {
    formPerokok.addEventListener("submit", function (event) {
        event.preventDefault();

        const dataForm = new FormData(formPerokok);

        const dataBaru = {
            nama: dataForm.get("nama").trim(),
            umur: dataForm.get("umur"),
            kelamin: dataForm.get("kelamin"),
            perokok: dataForm.get("perokok"),
            rokok: dataForm.getAll("rokok")
        };

        const semuaData = ambilData();

        semuaData.push(dataBaru);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(semuaData));

        window.location.href = "form.html";
    });
}

const tabelData = document.getElementById("dataPerokok");

if (tabelData) {
    const semuaData = ambilData();

    const daftarRokok = [
        "Gudang Garam Filter",
        "Lucky Strike",
        "Marlboro",
        "Esse"
    ];

    if (semuaData.length > 0) {
        tabelData.textContent = "";

        semuaData.forEach(function (data, index) {
            const baris = document.createElement("tr");

            const nilai = [
                index + 1,
                data.nama,
                data.umur,
                data.kelamin,
                data.perokok
            ];

            nilai.forEach(function (item) {
                const kolom = document.createElement("td");
                kolom.textContent = item;
                baris.appendChild(kolom);
            });

            daftarRokok.forEach(function (rokok) {
                const kolom = document.createElement("td");

                kolom.textContent = data.rokok.includes(rokok) ? "☑" : "☐";

                baris.appendChild(kolom);
            });

            tabelData.appendChild(baris);
        });
    }
}