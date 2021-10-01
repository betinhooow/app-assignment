Feature: Saving Goals

  Background: Setup
    Given the user is on the saving goals for home area
    And the saving goals elements was loaded
    And the current date is "September" of 2021

  Scenario: As a user I want to see the montlhy amount
    When the user set "25000.00" for amount
    And the user set 48 months in the future
    Then the montlhy amount should be "$521"
    And the reach date should be in "September" of 2025

  Scenario: As a user I can not be able to select a month in the past
    When the user set "17839.32" for amount
    And the user set 2 months in the future
    And the user set 4 months in the past
    Then the reach date should be in "October" of 2021
    And the montlhy amount should be "$17,839"

  Scenario: As a user I can not be able to set negative value to amount
    When the user set "-4412.87" for amount
    Then the montlhy amount should be "$4,413"

  Scenario: As a user I must see a warning when set 0 to amount
    When the user set "0" for amount
    Then should show a error message " amount should be greather than 0 "
