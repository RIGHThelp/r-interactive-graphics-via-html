context("Test search_RIGHT.R")

setRIGHT(libDir_RIGHT = ".",
         nameArray = "dummy",
         numSearch = 0,
         sourceArray = c(),
         scriptArray = c())

test_that("data.frame object should exist", {
  
  expect_error(search_RIGHT(dummy))
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numSearch, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any(file.path(temp$libDir_RIGHT, "search.js") %in% temp$sourceArray))
  
}) # test_that

test_that("Check script generation", {
  
  search_RIGHT(Theoph)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numSearch, 1)
  expect_identical(temp$nameArray, c("dummy", "Theoph"))
  expect_identical(temp$searchArray, 'makeSearchButton("searchBox1", Theoph);')
  expect_true(any("search.js" %in% temp$sourceArray))
  
}) # test_that
