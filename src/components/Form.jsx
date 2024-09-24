import { useState } from 'react';
import { fetchNames } from '../api/api';

const Form = () => {
  const [gender, setGender] = useState('');
  const [origin, setOrigin] = useState('');
  const [theme, setTheme] = useState('');
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const criteria = { gender, origin, theme };
    try {
      const fetchedNames = await fetchNames(criteria);
      setNames(fetchedNames);
    } catch (err) {
      setError('Failed to fetch names. Please try again later.', err);
    }
    setLoading(false);
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-start lg:justify-center py-5 px-5'>
      {/* Form Container */}
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mx-auto'>
        <h2 className='text-3xl font-extrabold text-center mb-6'>
          <span className='text-red-500'>UN</span>SURNAME
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex flex-col lg:flex-row lg:space-x-4'>
            {/* Gender Selection */}
            <div className='flex flex-col w-full'>
              <label htmlFor='gender' className='text-lg font-semibold mb-2'>
                Gender
              </label>
              <select
                name='gender'
                id='gender'
                className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400'
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value='' disabled>Select Gender</option>
                <option value='male'>Laki-laki</option>
                <option value='female'>Wanita</option>
              </select>
            </div>

            {/* Origin Input */}
            <div className='flex flex-col w-full'>
              <label htmlFor='origin' className='text-lg font-semibold mb-2'>
                Origin
              </label>
              <input
                type='text'
                id='origin'
                placeholder='cth: Jawa, Inggris, dll'
                className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400'
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </div>

          {/* Theme Input */}
          <div className='flex flex-col'>
            <label htmlFor='unsur' className='text-lg font-semibold mb-2'>
              Unsur
            </label>
            <input
              type='text'
              id='unsur'
              placeholder='e.g., Tech, Biology'
              className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400'
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className='text-center'>
            <button
              type='submit'
              className='bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-red-600 transition duration-300'
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Names'}
            </button>
          </div>
        </form>

        {/* Error Handling */}
        {error && (
          <div className='text-red-500 text-center mt-4'>
            {error}
          </div>
        )}
      </div>

      {/* Result Container */}
      {names.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-lg lg:max-w-2xl mx-auto mt-10'>
          <h3 className='text-lg font-semibold mb-2'>Generated Names:</h3>
          {/* Grid layout for larger screens */}
          <ul className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {names.map((name, index) => (
              <li
                key={index}
                className='bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-red-50 transition duration-300 ease-in-out border border-gray-300'
              >
                <span className='font-medium text-gray-800'>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Form;
