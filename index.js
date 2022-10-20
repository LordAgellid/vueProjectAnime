// // list of 10 items with an id
// const liste = [
//     { id: 1, name: 'item 1' },
//     { id: 2, name: 'item 2' },
//     { id: 3, name: 'item 3' },
//     { id: 4, name: 'item 4' },
//     { id: 5, name: 'item 5' },
//     { id: 6, name: 'item 6' },
//     { id: 7, name: 'item 7' },
//     { id: 8, name: 'item 8' },
//     { id: 9, name: 'item 9' },
//     { id: 10, name: 'item 10' },
// ];
// console.log(liste);

// // GENERATE THE NUMBER OF PAGES BASED ON THE ITEMS LIST
// function genererNbPages(items, nb) {
//     const nbPages = Math.ceil(items.length / nb);
//     return nbPages;
// }
// const nbPages = genererNbPages(liste, 3);

// // GENERATE THE PAGINATION LIST
// function paginationList(nb) {
//     const liste = [];
//     let Page;

//     for (let index = 1; index <= nb; index++) {
//         let Selected = false;
//         Page = index;
//         if (Page === 1) Selected = true;
//         liste.push({
//             Page,
//             Selected,
//         });
//     }
//     return liste;
// }
// const paginationListe = paginationList(nbPages);

// // SET THE PAGE
// function setPage() {
//     paginationListe;
// }

// console.log(setPage);

// list of ten items with an id
const list = [
    { id: 1, name: 'item 1' },
    { id: 2, name: 'item 2' },
    { id: 3, name: 'item 3' },
    { id: 4, name: 'item 4' },
    { id: 5, name: 'item 5' },
    { id: 6, name: 'item 6' },
    { id: 7, name: 'item 7' },
    { id: 8, name: 'item 8' },
    { id: 9, name: 'item 9' },
    { id: 10, name: 'item 10' },
];

const listePagination = [];

function paginationListe(items, listePagination, nbItems) {
    const nbPages = Math.ceil(items.length / nbItems);

    for (let index = 1; index <= nbPages; index++) {
        const numPage = index;
        let selected = false;
        if (numPage === 1) selected = !selected;
        listePagination.push({
            numPage,
            selected,
        });
    }

    return listePagination;
}

console.log(paginationListe(list, listePagination, 3));

function selectPage(numPage, items) {
    const pages = paginationListe(list, listePagination, 3);

    let end = (3 * numPage) - 1;
    const start = (end - 3) + 1;
    const selectedItems = [];

    for (const p of pages) {
        if (numPage === p.numPage) {
            p.selected = true;
            if (end > items.length) end = (items.length) - 1;
            for (let index = start; index <= end; index++) {
                selectedItems.push(items[index]);
            }
        } else {
            p.selected = false;
        }
    }
    return { selectedItems, pages };
}

// console.log(selectPage(1, list));
