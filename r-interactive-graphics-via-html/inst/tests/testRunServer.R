context("Test runServer.R")

## ---
## Test runServer()
## ---

setRIGHT(numServer = 0)

test_that("Check data object about server-offloading", {
  
  loessArray <- runServer({obj <- loess(conc ~ Time, Theoph)
                           simArray <- data.frame(Time = seq(min(Theoph$Time), max(Theoph$Time), length.out = 100))
                           simArray$conc <- predict(obj, simArray)
                           return(simArray)
                          })

  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$numServer, 1)
  expect_identical(class(loessArray), "RIGHTServer1")
  
  lmArray <- runServer({obj <- lm(conc ~ Time, Theoph)
                        simArray <- data.frame(Time = seq(min(Theoph$Time), max(Theoph$Time), length.out = 100))
                        simArray$conc <- predict(obj, simArray)
                        return(simArray)
  })
  
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$numServer, 2)
  expect_identical(class(lmArray), "RIGHTServer2")
  
}) # test_that
