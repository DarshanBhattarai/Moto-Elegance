"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "brands",
      [
        {
          id: 1,
          name: "Maruti Suzuki",
          logo: "https://www.citypng.com/public/uploads/preview/hd-suzuki-white-logo-transparent-background-701751694773165hhvzwovybw.png",
          backgroundImage:
            "https://images.unsplash.com/photo-1632414187391-7e4097f0de6b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFydXRpJTIwc3V6dWtpfGVufDB8fDB8fHww",
          popular: true,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Mahindra",
          logo: "https://cartell.tv/wp-content/uploads/2016/08/Mahindra-white.png",
          backgroundImage:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Mahindra_Thar_Photoshoot_At_Perupalem_Beach_%28West_Godavari_District%2CAP%2CIndia_%29_Djdavid.jpg/640px-Mahindra_Thar_Photoshoot_At_Perupalem_Beach_%28West_Godavari_District%2CAP%2CIndia_%29_Djdavid.jpg",
          popular: true,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "Tata",
          logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9c3773cb-5629-4145-b044-4ef6f9090376/dezxm1f-1e987c04-a1b7-4554-a189-ed574a591c68.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzljMzc3M2NiLTU2MjktNDE0NS1iMDQ0LTRlZjZmOTA5MDM3NlwvZGV6eG0xZi0xZTk4N2MwNC1hMWI3LTQ1NTQtYTE4OS1lZDU3NGE1OTFjNjgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pT18TJRr1Nxv_NkBpJ_SH64zchd0aco1BqJkqq991AM",
          backgroundImage:
            "https://images.hindustantimes.com/auto/img/2024/03/04/1600x900/Safari_Dark_Edition_1709536476940_1709536577002.jpg",
          popular: true,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "Hyundai",
          logo: "https://www.transparentpng.com/download/hyundai/hBFETU-hyundai-logo-background.png",
          backgroundImage:
            "https://images.hindustantimes.com/auto/img/2021/10/13/600x338/Sonata_N_Line_Night_Edition_1634100559661_1634100563946.JPG",
          popular: false,
          sponsored: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: "Toyota",
          logo: "https://images.squarespace-cdn.com/content/v1/571a72cf4c2f85c72e9a684a/1613066743166-2NH7VRKU4ZXM5XB1QAD0/Toyot+Symbol.png",
          backgroundImage:
            "https://www.hindustantimes.com/ht-img/img/2023/01/14/1600x900/Toyota_Innova_Hycross_review_Arko_6_1669913060372_1673670580169_1673670580169.jpg",
          popular: true,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: "Honda",
          logo: "https://www.vectorkhazana.com/assets/images/products/Honda_logo_white.jpg",
          backgroundImage:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Honda_amaze1.jpg/1200px-Honda_amaze1.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          name: "Mercedes-Benz",
          logo: "https://pngimg.com/d/mercedes_logos_PNG1.png",
          backgroundImage:
            "https://c4.wallpaperflare.com/wallpaper/281/548/978/mercedes-benz-amg-gt-car-wallpaper-preview.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          name: "BMW",
          logo: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png",
          backgroundImage:
            "https://c4.wallpaperflare.com/wallpaper/28/734/377/car-tuning-bmw-black-wallpaper-thumb.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          name: "Skoda",
          logo: "https://logos-world.net/wp-content/uploads/2022/09/Skoda-logo.png",
          backgroundImage:
            "https://cdn.suwalls.com/wallpapers/cars/2013-white-skoda-rapid-front-view-51136-1920x1080.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          name: "Land Rover",
          logo: "https://www.pngplay.com/wp-content/uploads/13/Land-Rover-Logo-Download-Free-PNG.png",
          backgroundImage: "https://picfiles.alphacoders.com/534/534560.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          name: "Honda Civic",
          logo: "https://www.freeiconspng.com/thumbs/honda-logo-png/honda-logo-transparent-background-0.jpg",
          backgroundImage:
            "https://wallpapers.com/images/hd/honda-civic-type-r-pq5ults3p6ps0s53.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          name: "MG",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Mg_logo.svg/512px-Mg_logo.svg.png",
          backgroundImage:
            "https://images.carandbike.com/cms/MG_GLOSTER_BLACKSTORM_ACTION_3_72673a20de.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 13,
          name: "Volkswagen",
          logo: "https://companieslogo.com/img/orig/VOW3.DE.D-df60d905.png?t=1720244494",
          backgroundImage:
            "https://wallpapers.com/images/hd/volkswagen-passat-cc-golden-mist-rurglxgba3yuguxj.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 14,
          name: "Renault",
          logo: "https://blis.com/wp-content/uploads/2019/08/Renault-logo-case-study-page.png",
          backgroundImage:
            "https://wallpapers.com/images/hd/black-renault-megane-j58e0l3g5qd84vms.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 15,
          name: "Jeep",
          logo: "https://www.pngplay.com/wp-content/uploads/13/Jeep-Logo-Transparent-File.png",
          backgroundImage:
            "https://c4.wallpaperflare.com/wallpaper/906/753/110/jeep-wrangler-jeep-car-vehicle-wallpaper-preview.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 16,
          name: "Audi",
          logo: "https://freelogopng.com/images/all_img/1686497099audi-logo-white-png.png",
          backgroundImage:
            "https://wallpapers.com/images/hd/black-audi-r8-v10-90nf168iy67arnon.jpg",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 17,
          name: "Lexus",
          logo: "https://pngimg.com/d/lexus_PNG22.png",
          backgroundImage:
            "https://images.unsplash.com/photo-1577496549804-8b05f1f67338?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGV4dXN8ZW58MHx8MHx8fDA%3D",
          popular: false,
          sponsored: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 18,
          name: "Nissan",
          logo: "https://cdn.freebiesupply.com/logos/large/2x/nissan-6-logo-svg-vector.svg",
          backgroundImage:
            "https://c4.wallpaperflare.com/wallpaper/626/424/23/nissan-nissan-gt-r-black-car-car-wallpaper-preview.jpg",
          popular: false,
          sponsored: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("brands", null, {});
  },
};
