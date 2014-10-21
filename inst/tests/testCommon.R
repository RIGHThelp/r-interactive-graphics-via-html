context("Test common.R")

## ---
## Check supportRIGHT global optoin:
## ---

test_that("supportRIGHT global option should be TRUE by default", {
  
  expect_identical(getOption("supportRIGHT"), TRUE)
  
}) # test_that

## ---
## Check setRIGHT():
## ---

test_that("all arguments to setRIGHT() should have a name", {
  
  expect_error(setRIGHT(1)) 
  expect_error(setRIGHT(a = 1, 2)) 
  
}) # test_that

test_that("setRIGHT() should set .RIGHT in package namespace", {
  
  setRIGHT(a = 1)
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$a, 1)
  
}) # test_that

test_that("clearRIGHT() clear .RIGHT in package namespace", {
  
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$a, 1)
  clearRIGHT()
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$a, NULL)
  
}) # test_that

## ---
## Check checkDataName():
## ---

# setRIGHT(nameArray = "Theoph")
# 
# test_that("checkDataName() should check against .RIGHT$nameArray", {
# 
#   expect_error(checkDataName("dummy"))
#   checkDataName("Theoph")
#   
# }) # test_that

## ---
## Check checkFormula_xy():
## ---

test_that("checkFormula_xy() should flag formulae other than y ~ x form", {

  expect_error(checkFormula_xy(~ x))
  expect_error(checkFormula_xy(~ x + y))
  expect_error(checkFormula_xy(z ~ x + y))
  expect_error(checkFormula_xy(z ~ y ~ x))
  
}) # test_that

test_that("checkFormula_xy() should return the axis names in list", {
  
  expect_identical(checkFormula_xy(y ~ x), list(x = "x", y = "y"))
  
}) # test_that

## ---
## Check checkFormula_x():
## ---

test_that("checkFormula_x() should flag formulae other than  ~ x or . ~ x form", {
  
  expect_error(checkFormula_x(y ~ x))
  expect_error(checkFormula_x(~x + y))
  expect_error(checkFormula_x(z ~ x ~ y))
  
}) # test_that

test_that("checkFormula_x() should return the x axis name in list", {
  
  expect_identical(checkFormula_x(~ x), list(x = "x"))
  expect_identical(checkFormula_x(. ~ x), list(x = "x"))
  
}) # test_that

## ---
## Check checkColumnName():
## ---

test_that("CheckColumnName() should flag non-existant columns", {
  
  # NULL should pass:
  checkColumnName(NULL, Theoph)
  
  expect_error(checkColumnName("dummy", Theoph))
  checkColumnName("conc", Theoph)
  
}) # test_that

## ---
## Check checkCol() and getRGB():
## ---

test_that("checkCol() should flag invalid color values", {
  
  # NULL should pass:
  checkCol(NULL)
  
  checkCol("a") # should work even if it is not a valid color name
  checkCol(c(1L, 2L, 3L)) # should work even if it is not a valid RGB vector
  checkCol(c(1.0, 2.0, 3.0)) # CHECK (junghoon): should this pass?
  
  expect_error(checkCol(c("a", "b")))
  expect_error(checkCol(c(1L, 2L)))
  expect_error(checkCol(c(1L, 2L, 3L, 4L)))
  
  # CHECK (junghoon): should I check for complex values?
  
  # CHECK (junghoon): should factors pass as well?
  expect_error(checkCol(factor(c(1L, 2L, 3L)))) 
  expect_error(checkCol(factor("red")))
  
  expect_error(checkCol(list(a = 1L, b = 2L, c = 3L)))
  
}) # test_that

test_that("getRGB() should return an RGB vector", {
  
  expect_identical(getRGB(NULL), NULL)
  
  expect_identical(getRGB(c(1L, 2L, 3L)), c(1L, 2L, 3L))
  expect_identical(getRGB(c(1.0, 2.0, 3.0)), c(1L, 2L, 3L))
  
  expect_identical(getRGB("red"), c(255L, 0L, 0L))
  
}) # test_that

## ---
## Check createArray():
## ---

test_that("createArray() should take only atomic vectors", {
  
  # CHECK (junghoon): how to check expression?
  expect_error(createArray(list(a = 1, 2, 3)))
  expect_error(createArray(y ~ x))
  
}) # test_that

test_that("alwaysArray should determine whether NULL or [] is returned for empty vectors", {
  
  expect_identical(createArray(), NULL)
  expect_identical(createArray(c()), NULL)
  expect_identical(createArray(alwaysArray = FALSE), NULL)
  expect_identical(createArray(alwaysArray = TRUE), "[]")
  expect_identical(createArray(c(), FALSE), NULL)
  expect_identical(createArray(c(), TRUE), "[]")
  
}) # test_that

test_that("alwaysArray determines whether [] is added to a single value", {
  
  expect_identical(createArray(1), "1")
  expect_identical(createArray(1, FALSE), "1")
  expect_identical(createArray(1, TRUE), "[1]")
  
}) # test_that

test_that("check whether arrays are properly surrounded with []", {
  
  expect_identical(createArray(c(1, 2, 3)), "[1, 2, 3]")
  expect_identical(createArray(c(1, 2, 3), FALSE), "[1, 2, 3]")
  expect_identical(createArray(c(1, 2, 3), TRUE), "[1, 2, 3]")
  
}) # test_that

test_that("test createArray() for various types", {
  
  expect_identical(createArray(c("a", "B", "C")), "['a', 'B', 'C']")
  expect_identical(createArray(c(TRUE, FALSE, TRUE)), "[true, false, true]")
  expect_identical(createArray(c(F, T, F)), "[false, true, false]")
  expect_identical(createArray(as.factor(c("a", "B", "C"))), "['a', 'B', 'C']")
  expect_identical(createArray(as.factor(c(1, 2, 3))), "['1', '2', '3']") # CHECK (junghoon): is this the right behavior?
  
}) # test_that

## ---
## Check createObject():
## ---

test_that("createObject() should take only lists", {
  
  expect_error(createObject(fieldList = 1)) 
  expect_error(createObject(fieldList = c(1, 2, 3)))
  
}) # test_that

test_that("all list entries should have a name", {
  
  expect_error(createObject(1)) 
  expect_error(createObject(fieldList = list(1))) 
  expect_error(createObject(a = 1, fieldList = list(2))) 
  expect_error(createObject(1, fieldList = list(b = 2)))
  
}) # test_that

test_that("names should not be repeated", {
  
  expect_error(createObject(a = 1, fieldList = list(a = 1, b = 2)))
  
}) # test_that

test_that("alwaysObject should determine whether NULL or {} is returned for NULL objects", {
  
  expect_identical(createObject(), NULL)
  expect_identical(createObject(alwaysObject = FALSE), NULL)
  expect_identical(createObject(alwaysObject = TRUE), "{}")
  
}) # test_that

test_that("check whether alwaysObject works for multiple levels", {
  
  expect_identical(createObject(a = 1, b = list()), "{a: 1}")
  expect_identical(createObject(a = 1, b = list(), alwaysObject = FALSE), "{a: 1}")
  expect_identical(createObject(a = 1, b = list(), alwaysObject = TRUE), "{a: 1, b: {}}")
  
}) # test_that

test_that("check whether alwaysArray works for multiple levels", {
  
  expect_identical(createObject(a = 1), "{a: 1}")
  expect_identical(createObject(a = 1, alwaysArray = FALSE), "{a: 1}")
  expect_identical(createObject(a = 1, alwaysArray = TRUE), "{a: [1]}")
  
  expect_identical(createObject(a = 1, b = list(c = 1)), "{a: 1, b: {c: 1}}")
  expect_identical(createObject(a = 1, b = list(c = 1), alwaysArray = FALSE), "{a: 1, b: {c: 1}}")
  expect_identical(createObject(a = 1, b = list(c = 1), alwaysArray = TRUE), "{a: [1], b: {c: [1]}}")
  
}) # test_that

test_that("check whether arrays are properly surrounded with [] in objects", {
  
  expect_identical(createObject(a = c(1, 2, 3), fieldList = list(b = c(4, 5, 6))), "{a: [1, 2, 3], b: [4, 5, 6]}")
  expect_identical(createObject(a = c(1, 2, 3), b = list(c = c(4, 5, 6))), "{a: [1, 2, 3], b: {c: [4, 5, 6]}}")

}) # test_that

# Check the use of createArray:
test_that("check whether various types are supported in objects", {
  
  expect_identical(createObject(a = c("a", "B", "C")), "{a: ['a', 'B', 'C']}")
  expect_identical(createObject(a = c(TRUE, FALSE, TRUE)), "{a: [true, false, true]}")
  expect_identical(createObject(a = c(F, T, F)), "{a: [false, true, false]}")
  expect_identical(createObject(a = as.factor(c("a", "B", "C"))), "{a: ['a', 'B', 'C']}")
  expect_identical(createObject(a = as.factor(c(1, 2, 3))), "{a: ['1', '2', '3']}") # CHECK (junghoon): is this the right behavior?
  
}) # test_that
