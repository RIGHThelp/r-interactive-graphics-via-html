AlldataArr <- scan("./www/data.js", what="")
firstag <- FALSE
changeJSON <- FALSE
iData <- 1
dataObj <- c()

repeat { 
  if(iData <= length(AlldataArr)) {
    if(AlldataArr[iData] == "var" && firstag == FALSE) {
      iFirst <- iData
      firstag <- TRUE
    } else if(AlldataArr[iData] == "var" && firstag == TRUE) {
      iData <- iData - 1
      iSecond <- iData
      firstag <- FALSE
      changeJSON <- TRUE
    }
  } else if(iData > length(AlldataArr) && firstag == TRUE) {
    iSecond <- iData - 1
    firstag <- FALSE
    changeJSON <- TRUE
  }
  
  if(changeJSON == TRUE) {
    dataName <- paste0(".", AlldataArr[iFirst + 1])
    for(i in (iFirst+3):iSecond) {
      dataObj <- paste0(dataObj, paste0(" ", AlldataArr[i]))
    } 
    dataObj <- rjson::fromJSON(dataObj) 
    obj <- as.data.frame(lapply(dataObj, function (x) {
      if (is.list(x)) {
        return(factor(x$index, labels = x$level))
      } else {
        return(x)
      } 
    }))   
    names(obj) <- names(dataObj)
    assign(dataName, obj)
    dataObj <- c()
    changeJSON <- FALSE
  }
  
  if(iData > length(AlldataArr)) {
    break
  } else {  
    iData <- iData + 1
  }
}

shinyServer(function(input, output) {

	output$loessArray1 <- reactive({ 
		if (length(input$subDiamonds) != 0) { 
			if (length(input$subDiamonds) > 1) { 
				subDiamonds <- .subDiamonds[!input$subDiamonds, ]
				{
    obj <- loess(carat ~ price, data = subDiamonds)
    xRange <- range(subDiamonds$price)
    simArray <- data.frame(price = seq(xRange[1], xRange[2], length.out = 132))
    simArray$carat <- predict(obj, newdata = simArray)
    return(simArray)
}
			} else { 
				output <- list(-1, -1) 
				return (output) 
			}
		}
	})
	output$lmArray1 <- reactive({ 
		if (length(input$subDiamonds) != 0) { 
			if (length(input$subDiamonds) > 1) { 
				subDiamonds <- .subDiamonds[!input$subDiamonds, ]
				{
    obj <- lm(carat ~ price, data = subDiamonds)
    xRange <- range(subDiamonds$price)
    simArray <- data.frame(price = seq(xRange[1], xRange[2], length.out = 132))
    simArray$carat <- predict(obj, newdata = simArray)
    return(simArray)
}
			} else { 
				output <- list(-1, -1) 
				return (output) 
			}
		}
	})
	output$loessArray2 <- reactive({ 
		if (length(input$Theoph) != 0) { 
			if (length(input$Theoph) > 1) { 
				Theoph <- .Theoph[!input$Theoph, ]
				{
    obj <- loess(conc ~ Time, data = Theoph)
    xRange <- range(Theoph$Time)
    simArray <- data.frame(Time = seq(xRange[1], xRange[2], length.out = 132))
    simArray$conc <- predict(obj, newdata = simArray)
    return(simArray)
}
			} else { 
				output <- list(-1, -1) 
				return (output) 
			}
		}
	})
	output$lmArray2 <- reactive({ 
		if (length(input$Theoph) != 0) { 
			if (length(input$Theoph) > 1) { 
				Theoph <- .Theoph[!input$Theoph, ]
				{
    obj <- lm(conc ~ Time, data = Theoph)
    xRange <- range(Theoph$Time)
    simArray <- data.frame(Time = seq(xRange[1], xRange[2], length.out = 132))
    simArray$conc <- predict(obj, newdata = simArray)
    return(simArray)
}
			} else { 
				output <- list(-1, -1) 
				return (output) 
			}
		}
	})
})
