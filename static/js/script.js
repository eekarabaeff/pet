const districtMap = {
    "AdmiralteyskyD": "Admiralteysky",
    "VasileostrovskyD": "Vasileostrovsky",
    "VyborgskyD": "Vyborgsky",
    "KalininskyD": "Kalininsky",
    "KirovskyD": "Kirovsky",
    "KolpinskyD": "Kolpinsky",
    "KrasnogvardeyskyD": "Krasnogvardeysky",
    "KrasnoselskyD": "Krasnoselsky",
    "KronshtadtskyD": "Kronshtadtsky",
    "KurortnyD": "Kurortny",
    "MoskovskyD": "Moskovsky",
    "NevskyD": "Nevsky",
    "PetrogradskyD": "Petrogradsky",
    "PetrodvortsovyD": "Petrodvortsovy",
    "PrimorskyD": "Primorsky",
    "PushkinskyD": "Pushkinsky",
    "FrunzenskyD": "Frunzensky",
    "TsentralnyD": "Tsentralny"
};

const reverseDistrictMap = {};
for (const key in districtMap) {
    reverseDistrictMap[districtMap[key]] = key;
};

document.getElementById("spbMap").addEventListener("load", function() {
    const svgDoc = this.contentDocument;
    const paths = svgDoc.querySelectorAll("path.district");
    const listItems = document.querySelectorAll(".districtItem"); // Изменено: выбираем span.districtItem

    listItems.forEach(item => {
        const link = item.querySelector("a"); // Получаем ссылку внутри span
        link.addEventListener("mouseover", () => {
            const districtId = item.id; // Берем ID у span, а не у ссылки
            const mapId = districtMap[districtId];
            
            link.style.backgroundColor = "#87CEFA";
            
            paths.forEach(path => {
                if (path.id === mapId) {
                    path.style.fill = "#87CEFA";
                }
            });
        });

        link.addEventListener("mouseout", () => {
            const districtId = item.id; // Берем ID у span, а не у ссылки
            const mapId = districtMap[districtId];
            
            link.style.backgroundColor = "#ffffff";
            
            paths.forEach(path => {
                if (path.id === mapId) {
                    path.style.fill = "#ffffff";
                }
            });
        });

        link.addEventListener('click', function(e) {
            e.preventDefault();
            const districtName = encodeURIComponent(this.textContent.trim());
            window.location.href = `district?district=${districtName}`;
        });
    });
    
    paths.forEach(path => {
        path.addEventListener("mouseover", () => {
            const districtId = path.getAttribute("id");
            const mapId = reverseDistrictMap[districtId];

            path.style.fill = "#87CEFA";
            path.style.cursor = "pointer";

            listItems.forEach(item => {
                if (item.id === mapId) {
                    item.querySelector("a").style.backgroundColor = "#87CEFA";
                }
            });
        });

        path.addEventListener("mouseout", () => {
            const districtId = path.getAttribute("id");
            const mapId = reverseDistrictMap[districtId];

            path.style.fill = "#ffffff";

            listItems.forEach(item => {
                if (item.id === mapId) {
                    item.querySelector("a").style.backgroundColor = "#ffffff";
                }
            });
        });

        path.addEventListener('click', () => {
            const districtId = path.getAttribute("id");
            const mapId = reverseDistrictMap[districtId];
            const districtName = document.getElementById(mapId).querySelector("a").textContent.trim();
            window.location.href = `district?district=${encodeURIComponent(districtName)}`;
        });
    });
});
    