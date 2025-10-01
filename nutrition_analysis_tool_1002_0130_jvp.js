// 代码生成时间: 2025-10-02 01:30:27
import EmberObject from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// Define a model to represent the meal
class Meal extends EmberObject {
  @tracked name = '';
  @tracked calories = 0;
  @tracked carbohydrates = 0;
  @tracked proteins = 0;
  @tracked fats = 0;

  constructor(name, calories, carbohydrates, proteins, fats) {
    super(...arguments);
    this.name = name;
    this.calories = calories;
    this.carbohydrates = carbohydrates;
    this.proteins = proteins;
    this.fats = fats;
  }

  // Method to calculate the total nutritional value
  calculateNutritionalValue() {
    if (this.calories < 0 || this.carbohydrates < 0 || this.proteins < 0 || this.fats < 0) {
      throw new Error('Nutritional values cannot be negative.');
    }
    return {
      calories: this.calories,
      carbohydrates: this.carbohydrates,
      proteins: this.proteins,
      fats: this.fats
    };
  }
}

// Define a controller for the nutrition analysis tool
export default class NutritionAnalysisController extends EmberObject {
  @tracked meal;
  @tracked nutritionalInfo = {};

  constructor() {
    super(...arguments);
    this.meal = new Meal('', 0, 0, 0, 0);
  }

  // Action to handle meal data input
  @action
  handleMealDataInput(name, calories, carbohydrates, proteins, fats) {
    try {
      this.meal = new Meal(name, parseInt(calories), parseInt(carbohydrates), parseInt(proteins), parseInt(fats));
      this.nutritionalInfo = this.meal.calculateNutritionalValue();
    } catch (error) {
      console.error(error.message);
      // Handle error (e.g., display error message to user)
    }
  }
}

// Define a component for displaying the meal's nutritional information
export default class NutritionDisplayComponent extends EmberObject {
  @tracked nutritionalInfo = {};

  // Method to update nutritional information
  updateNutritionalInfo(info) {
    this.nutritionalInfo = info;
  }
}
