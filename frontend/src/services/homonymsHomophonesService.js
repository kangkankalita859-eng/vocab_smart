export async function fetchHomonymsHomophones(start = 0, limit = null) {
  try {
    const [wordsRes, imagesRes] = await Promise.all([
      fetch('/data/english/homonyms-homophones-words.json'),
      fetch('/data/english/homonyms-homophones-images.json')
    ]);

    const wordsData = await wordsRes.json();

    let imagesData = [];
    try {
      imagesData = await imagesRes.json();
    } catch {
      imagesData = [];
    }

    const imageById = new Map(
      (Array.isArray(imagesData) ? imagesData : []).map((item) => [item.id, item])
    );

    const merged = (Array.isArray(wordsData) ? wordsData : []).map((item) => {
      const img = imageById.get(item.id);
      return {
        ...item,
        image: img?.image || ""
      };
    });

    const filteredData = start > 0 ? merged.filter((item) => item.id >= start) : merged;
    const paginatedData = limit ? filteredData.slice(0, limit) : filteredData;

    return {
      status: 'success',
      count: paginatedData.length,
      total: merged.length,
      start,
      limit,
      data: paginatedData
    };
  } catch (error) {
    return {
      status: 'error',
      message: `Failed to load homonyms/homophones data: ${error.message}`
    };
  }
}
