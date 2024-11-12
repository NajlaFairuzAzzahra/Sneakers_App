// src/service/SneakersService.js
import axios from 'axios';

const BASE_URL = 'https://sneakers-global-default-rtdb.asia-southeast1.firebasedatabase.app';
const ITEMS_PER_PAGE = 10;

export const getSneakers = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/sneakers.json`);
    
    // Ambil array sneakers langsung dari response
    const sneakersArray = response.data.sneakers || [];
    
    // Hitung pagination
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedSneakers = sneakersArray.slice(start, end);
    
    return {
      sneakers: paginatedSneakers,
      totalItems: sneakersArray.length,
      totalPages: Math.ceil(sneakersArray.length / ITEMS_PER_PAGE),
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};