describe("Add Workout", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.wait(1000);
  });

  it("Adding a new workout", () => {
    cy.get("[data-testid=addWorkoutButton]").click();

    cy.get("[data-testid=workoutTextInput]").type("this is a test");

    cy.contains("OK").click();

    cy.get("[data-testid=createdWorkout]").should("contain", "this is a test");
  })

  it("Adding an exercise to a workout!", () => {

    cy.get("[data-testid=exerciseButton]").click()

    cy.get("[data-testid=dialogPopup]");

    cy.get("[data-testid=workoutTextInput]").type("this is a test");

    cy.contains("OK").click();

    cy.get("[data-testid=createdWorkout]").should("contain", "this is a test");
  });
});
