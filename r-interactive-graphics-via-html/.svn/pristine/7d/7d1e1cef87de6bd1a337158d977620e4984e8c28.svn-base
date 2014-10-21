context("Test table_RIGHT.R")

setRIGHT(libDir_RIGHT = ".",
         nameArray = "dummy",
         numTable = 0,
         sourceArray = c(),
         scriptArray = c())

test_that("data.frame object should exist", {
  
  expect_error(table_RIGHT(dummy))
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numTable, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any("table.js" %in% temp$sourceArray))
  
}) # test_that

test_that("height should be an integer", {
  
  expect_error(table_RIGHT(Theoph, c(1, 2)))
  expect_error(table_RIGHT(Theoph, 1.23))
  expect_error(table_RIGHT(Theoph, "A"))
  expect_error(table_RIGHT(Theoph, list(a = 1)))
  
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numTable, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any("table.js" %in% temp$sourceArray))
  
}) # test_that

test_that("Check script generation", {
  
  # With default height:
  table_RIGHT(Theoph)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numTable, 1)
  expect_identical(temp$nameArray, c("dummy", "Theoph"))
  expect_identical(temp$scriptArray, 'makeTable("table1", Theoph, 200);')
  expect_true(any("table.js" %in% temp$sourceArray))

  table_RIGHT(Theoph, 300)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numTable, 2)
  expect_identical(temp$nameArray, c("dummy", "Theoph", "Theoph"))
  expect_identical(temp$scriptArray, c('makeTable("table1", Theoph, 200);',
                                       'makeTable("table2", Theoph, 300);'))
  expect_true(any("table.js" %in% temp$sourceArray))
  
}) # test_that
