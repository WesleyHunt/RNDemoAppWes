import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';
import QuestionTwoScreen from '../src/screens/QuestionTwoScreen';
import OwnershipSliderCalculator, {CalculateOwnership, RoundToNearestMultiplier} from '../src/components/OwnershipSliderCalculator';

//child check test
describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree.children.length).toBe(1)
  })

  //Check base page snapshot has not changed
  it('renders page correctly', () => {
    const tree = renderer.create(<QuestionTwoScreen />).toJSON();
    expect(tree).toMatchSnapshot()
  })

  //check component has not changed
  it('renders calculator component correctly', () => {
    const tree = renderer.create(<OwnershipSliderCalculator />).toJSON();
    expect(tree).toMatchSnapshot()
  })

   //check component has not changed
   it('renders calculator component with props correctly', () => {
    const tree = renderer.create(<OwnershipSliderCalculator initialInvestment={1200} monthlyInvestment={100} yearsWithCompany={5}/>).toJSON();
    expect(tree).toMatchSnapshot()
  })

})

describe('Calculation functions', () => {
  it('returns a non null / invalid value', () => {
    expect(CalculateOwnership(null, null, null)).toStrictEqual(expect.anything())
    expect(CalculateOwnership(null, 100, null)).toStrictEqual(expect.anything())
    expect(CalculateOwnership(null, "helloworld", null)).toStrictEqual(expect.anything())
    expect(CalculateOwnership(1,2,3)).toStrictEqual(expect.anything())
    expect(CalculateOwnership('1', '2', '3')).toStrictEqual(expect.anything())
    expect(CalculateOwnership("hellow", "helloworld","world")).toStrictEqual(expect.anything())
  })

  it('returns expected calculated value', () => {
    /**redundant check: function calculateOwnership (initialInvestment, monthlyInvestment, monthsRenting) => {
    return initialInvestment + (monthlyInvestment * monthsRenting)
    return 1500 + (100 * yearsRenting*12)
    return 1500 + (100 * 1*12) = 2700
    **/
   expect(CalculateOwnership(1500,100,1)).toStrictEqual(2700)
  })

  it('round function returns expected value', () => {
    expect(RoundToNearestMultiplier(101, 25)).toStrictEqual(100)
    expect(RoundToNearestMultiplier(100, 25)).toStrictEqual(100)
    expect(RoundToNearestMultiplier(99, 25)).toStrictEqual(100)
    expect(RoundToNearestMultiplier(112, 25)).toStrictEqual(100)
    expect(RoundToNearestMultiplier(113, 25)).toStrictEqual(125)
  })

})