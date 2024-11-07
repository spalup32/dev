/*
function to compare two json objects and list down the changed properties, 
works with nested object


*/

function findDifferences(obj1, obj2, path = '') {
    let differences = [];
  
    // If both objects are the same, no differences
    if (obj1 === obj2) return differences;
  
    // If one of the objects is null or undefined, or they are of different types
    if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      differences.push(path );
      return differences;
    }
  
    // Get all keys from both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    // Check for keys in obj1 that are not in obj2 or have different values
    for (let key of keys1) {
      const newPath = path ? `${path}.${key}` : key;
      if (!keys2.includes(key)) {
        differences.push(path ); // key is missing in obj2
      } else {
        // Recurse for nested objects
        differences = differences.concat(findDifferences(obj1[key], obj2[key], newPath));
      }
    }
  
    return differences;
  }
  
  // Example usage
  const obj1 = {
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "New York"
    },
    cars :[
        {
            brand: "bwm",
            color: "white"
        },
        {
            brand: "tata",
            color: "black"
        }
    ]
  };
  
  const obj2 = {
    name: "John",
    age: 31, // Changed value
    address: {
      street: "123 Main St",
      city: "Los Angeles" // Changed value
    },
    cars :[
        {
            brand: "merc",
            color: "white"
        },
        {
            brand: "tata",
            color: "white"
        }
    ]
  };
  
  const differences = findDifferences(obj1, obj2);
  console.log(differences);
  