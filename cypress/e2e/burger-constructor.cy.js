describe('service is available', function () {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("testRefreshToken")
    );
    cy.setCookie('accessToken', 'testAccessToken')
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });

  it('should be drag-and-drop', function () {
    cy.get('[data-cy="ingredientItem"]').contains("Краторная булка N-200i").trigger('dragstart');
    cy.get('[data-cy="constructorBun"]').trigger('drop');
    cy.get('[data-cy="ingredientItem"]').contains("Плоды Фалленианского дерева").trigger('dragstart');
    cy.get('[data-cy="constructorIngredient"]').trigger('drop');
    cy.get('[data-cy="ingredientItem"]').contains("Соус традиционный галактический").trigger('dragstart');
    cy.get('[data-cy="constructorIngredient"]').trigger('drop');
    cy.get('[data-cy="ingredientItem"]').contains("Плоды Фалленианского дерева").trigger('dragstart');
    cy.get('[data-cy="constructorIngredient"]').trigger('drop');
  });

  it('should be get order number,open and close order-modal', function () {
    cy.get("button").contains("Оформить заказ").click();
    cy.wait("@postOrder").then(() => { cy.get('[data-cy="orderDetails"]').contains("431241") });
    cy.get('[data-cy="closeModal"]').click();
  });

  it('should be open and close ingredient-modal', function () {
    cy.get('[data-cy="ingredientItem"]').contains("Соус традиционный галактический").click();
    cy.get('[data-cy="modalTitle"]').contains("Детали ингредиента");
    cy.get('[data-cy="closeModal"]').click();
  });
});