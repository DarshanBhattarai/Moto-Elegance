const db = require("../models");
const Brand = db.Brand;
const Car = db.Car;
const fs = require("fs");
const path = require("path");

const seedData = async () => {
  try {
    // Get data from original db.json if available
    let vehicleData = {
      brands: [
        {
          name: "Toyota",
          logo: "https://www.freeiconspng.com/uploads/toyota-logo-png-30.png",
          popular: true,
        },
        {
          name: "Honda",
          logo: "https://www.freeiconspng.com/thumbs/honda-logo-png/honda-logo-transparent-background-0.jpg",
          popular: true,
        },
        {
          name: "Maruti Suzuki",
          logo: "https://www.citypng.com/public/uploads/preview/hd-suzuki-white-logo-transparent-background-701751694773165hhvzwovybw.png",
          popular: true,
        },
        {
          name: "Mahindra",
          logo: "https://cartell.tv/wp-content/uploads/2016/08/Mahindra-white.png",
          popular: true,
        },
        {
          name: "Tata",
          logo: "https://www.carlogos.org/logo/Tata-Group-logo-3840x2160.png",
          popular: true,
        },
        {
          name: "Hyundai",
          logo: "https://www.transparentpng.com/download/hyundai/hBFETU-hyundai-logo-background.png",
          popular: false,
          sponsored: true,
        },
        {
          name: "Kia",
          logo: "https://freelogopng.com/images/all_img/1686590298kia-logo-white.png",
          popular: false,
        },
        {
          name: "Mercedes-Benz",
          logo: "https://pngimg.com/d/mercedes_logos_PNG1.png",
          popular: false,
        },
        {
          name: "BMW",
          logo: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png",
          popular: false,
        },
        {
          name: "Audi",
          logo: "https://freelogopng.com/images/all_img/1686497099audi-logo-white-png.png",
          popular: false,
        },
        {
          name: "Lexus",
          logo: "https://pngimg.com/d/lexus_PNG22.png",
          popular: false,
        },
        {
          name: "Nissan",
          logo: "https://cdn.freebiesupply.com/logos/large/2x/nissan-6-logo-svg-vector.svg",
          popular: false,
        },
      ],
    };

    const frontendPath = path.join(__dirname, "../../moto-elegance/db.json");
    try {
      if (fs.existsSync(frontendPath)) {
        const jsonData = JSON.parse(fs.readFileSync(frontendPath, "utf8"));
        if (jsonData.vechicleCatalog) {
          vehicleData.catalog = jsonData.vechicleCatalog;
        }
      }
    } catch (error) {
      console.log(
        "Could not read db.json from frontend, using default data:",
        error.message
      );
    }

    // Create brands
    console.log("Creating brands...");
    const createdBrands = {};

    for (const brandData of vehicleData.brands) {
      try {
        // Check if brand already exists
        const existingBrand = await Brand.findOne({
          where: { name: brandData.name },
        });

        if (existingBrand) {
          console.log(`Brand ${brandData.name} already exists, skipping...`);
          createdBrands[brandData.name] = existingBrand;
          continue;
        }

        const brand = await Brand.create({
          name: brandData.name,
          logo: brandData.logo,
          backgroundImage: brandData.backgroundImage || null,
          popular: brandData.popular || false,
          sponsored: brandData.sponsored || false,
          description: brandData.description || null,
        });

        console.log(`Created brand: ${brand.name}`);
        createdBrands[brand.name] = brand;
      } catch (error) {
        console.error(`Error creating brand ${brandData.name}:`, error.message);
        // Continue with next brand even if one fails
        continue;
      }
    }

    // Create cars from catalog
    console.log("Creating cars from catalog...");
    if (vehicleData.catalog && Array.isArray(vehicleData.catalog)) {
      for (const carData of vehicleData.catalog) {
        try {
          // Check if brand exists
          const brand = createdBrands[carData.brand];
          if (!brand) {
            console.log(
              `Brand ${carData.brand} not found, skipping car ${carData.model}`
            );
            continue;
          }

          // Check if car already exists
          const existingCar = await Car.findOne({
            where: {
              model: carData.model,
              brandId: brand.id,
            },
          });

          if (existingCar) {
            console.log(`Car ${carData.model} already exists, skipping...`);
            continue;
          }

          const car = await Car.create({
            model: carData.model,
            year: carData.year || new Date().getFullYear(),
            price: carData.price || 0,
            brandId: brand.id,
            description: carData.description || null,
            imageUrl: carData.imageUrl || null,
            // Add other required fields with default values
            engineType: carData.engineType || "Unknown",
            transmission: carData.transmission || "Unknown",
            fuelType: carData.fuelType || "Unknown",
            bodyType: carData.bodyType || "Unknown",
            seatingCapacity: carData.seatingCapacity || 5,
          });

          console.log(`Created car: ${car.model}`);
        } catch (error) {
          console.error(`Error creating car ${carData.model}:`, error.message);
          // Continue with next car even if one fails
          continue;
        }
      }
    } else {
      // Create some default cars if no catalog is available
      console.log("Creating default cars...");

      const defaultCars = [
        {
          model: "Camry",
          year: 2023,
          price: 2500000,
          mileage: 18,
          fuelType: "Petrol",
          transmission: "Automatic",
          bodyType: "Sedan",
          engineCapacity: 2500,
          imageUrl: "https://picsum.photos/id/111/500/300",
          brand: "Toyota",
        },
        {
          model: "City",
          year: 2022,
          price: 1800000,
          mileage: 20,
          fuelType: "Petrol",
          transmission: "CVT",
          bodyType: "Sedan",
          engineCapacity: 1500,
          imageUrl: "https://picsum.photos/id/222/500/300",
          brand: "Honda",
        },
        {
          model: "Swift",
          year: 2023,
          price: 800000,
          mileage: 22,
          fuelType: "Petrol",
          transmission: "Manual",
          bodyType: "Hatchback",
          engineCapacity: 1200,
          imageUrl: "https://picsum.photos/id/333/500/300",
          brand: "Maruti Suzuki",
        },
        {
          model: "Thar",
          year: 2023,
          price: 1500000,
          mileage: 15,
          fuelType: "Diesel",
          transmission: "Manual",
          bodyType: "SUV",
          engineCapacity: 2000,
          imageUrl: "https://picsum.photos/id/444/500/300",
          brand: "Mahindra",
        },
        {
          model: "Nexon",
          year: 2023,
          price: 1000000,
          mileage: 17,
          fuelType: "Petrol",
          transmission: "Manual",
          bodyType: "SUV",
          engineCapacity: 1200,
          imageUrl: "https://picsum.photos/id/555/500/300",
          brand: "Tata",
        },
      ];

      for (const carData of defaultCars) {
        try {
          const brand = createdBrands[carData.brand];
          if (!brand) {
            console.log(
              `Brand ${carData.brand} not found, skipping car ${carData.model}`
            );
            continue;
          }

          const existingCar = await Car.findOne({
            where: {
              model: carData.model,
              brandId: brand.id,
            },
          });

          if (existingCar) {
            console.log(`Car ${carData.model} already exists, skipping...`);
            continue;
          }

          const car = await Car.create({
            model: carData.model,
            year: carData.year,
            price: carData.price,
            brandId: brand.id,
            mileage: carData.mileage,
            engineType: "Internal Combustion",
            transmission: carData.transmission,
            fuelType: carData.fuelType,
            bodyType: carData.bodyType,
            engineCapacity: carData.engineCapacity,
            imageUrl: carData.imageUrl,
            description: `Default ${carData.brand} ${carData.model} car`,
            seatingCapacity: 5,
          });

          console.log(`Created default car: ${car.model}`);
        } catch (error) {
          console.error(
            `Error creating default car ${carData.model}:`,
            error.message
          );
          continue;
        }
      }
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  }
};

module.exports = seedData;
