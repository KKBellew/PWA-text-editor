
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');
import { openDb } from 'jate'; // Import the necessary function from Jate

// Define your putDb function
export const putDb = async (content) => {
    try {
        // Open the database
        const db = await openDb('your_database_name', 1, (upgradeDb) => {
            // Create an object store (table) in the database
            if (!upgradeDb.objectStoreNames.contains('your_object_store_name')) {
                upgradeDb.createObjectStore('your_object_store_name', { keyPath: 'id', autoIncrement: true });
            }
        });

        // Add the content to the object store
        await db.add('your_object_store_name', content);

        console.log('Data added to the database successfully.');

        // Close the database connection
        db.close();
    } catch (error) {
        console.error('Error while adding data to the database:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');
import { openDb } from 'jate'; // Import the necessary function from Jate

export const getDb = async () => {
    try {
        // Open the database
        const db = await openDb('your_database_name', 1);

        // Get all content from the object store
        const allContent = await db.getAll('your_object_store_name');

        // Close the database connection
        db.close();

        return allContent;
    } catch (error) {
        console.error('Error while getting data from the database:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

initdb();
