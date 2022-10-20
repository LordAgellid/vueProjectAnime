const svrURL = 'https://tvshowdbapi.herokuapp.com';

// eslint-disable-next-line import/prefer-default-export
export { svrURL };

// pagination function
// export const paginate = (currentPage, itemsPerPage, totalItems, paginate) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
//     pageNumbers.push(i);
//   }
//   return (
//     <Pagination
//       itemsPerPage={itemsPerPage}
//       totalItems={totalItems}
//       currentPage={currentPage}
//       paginate={paginate}
//       pageNumbers={pageNumbers}
//     />
//   );
// }
