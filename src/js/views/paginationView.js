import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages.
    if (currentPage === 1 && numPages > 1)
      return this._generateNextPageBtn(currentPage);

    // Page 1, and there are no other pages.
    if (currentPage === 1 && numPages === 1) return ``;

    // Last page
    if (currentPage === numPages && numPages > 1)
      return this._generatePreviousPageBtn(currentPage);

    // Other page
    if (currentPage > 1 && currentPage < numPages)
      return [
        this._generatePreviousPageBtn(currentPage),
        this._generateNextPageBtn(currentPage),
      ].join('');
  }

  _generateNextPageBtn(currentPage) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        currentPage + 1
      }">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generatePreviousPageBtn(currentPage) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        currentPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();
