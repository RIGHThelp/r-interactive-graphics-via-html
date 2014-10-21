#' @title Add Lines to a Plot
#'
#' @description lines_RIGHT draws a sequence of points in the current axis.
#' 
#' @param form a formula describing the x and y variables as y ~ x.
#' @param data a data.frame object.
#' @param by column used to group lines. Default is NULL.
#' @param isString a character is expected for \code{data} if \code{TRUE}. It is useful for programming.
#'
#' @seealso \code{\link{lines}} 
#' 
#' @export
#' 
#' @examples
#' \donttest{
#' obj <- RIGHT({plot(conc ~ Time, Theoph, type = "n") # create blank axis
#'               lines(conc ~ Time, Theoph)})
#' print(obj)
#' }
lines_RIGHT <- function(form, data, by = NULL, isString = FALSE) {

  col <- NULL # TEMPORARY
  offPlot <- FALSE
  
  ## ---
  ## Take strings if asked:
  ## ---
  
  # Make sure that data exists:
  argArray <- as.list(match.call())
  
  if (!isString) {
    
    for(iData in 1:.RIGHT$numServer) {
      if(is(data, paste0("RIGHTServer", iData))) {
        offPlot <- TRUE
        break
      } # if
    } # for
    
    data <- if (is.null(argArray$data)) NULL else as.character(argArray$data)
    by <- if (is.null(argArray$by)) NULL else as.character(argArray$by)
    
  } # if
  
  ## ---
  ## Check input arguments:
  ## ---
  
  # Make sure that there is at least one axis to draw on:
  if (.RIGHT$numAxis == 0) {
    stop("plot_RIGHT has not been called yet.")
  } # if
  
  # get is necessary in case a character string is given for data:
  if (!exists(data, envir = parent.frame())) {
    stop(data, " does not exist.")
  } # if
  dataArray <- get(data, envir = parent.frame(), inherits = TRUE)
  
  # Check whether the columns exist:
  axisName <- checkFormula_xy(form)
  checkColumnName(axisName$x, dataArray)
  checkColumnName(axisName$y, dataArray)

  # Check by option:
  checkColumnName(by, dataArray)
  
  # Check col option:
  checkCol(col)
  col <- getRGB(col)
  
  ## ---
  ## Plot lines:
  ## ---
  
  # Keep name of the data object:
  if(!offPlot) {
    
    .RIGHT$nameArray <- append(.RIGHT$nameArray, data)
    
    # Increment the number of points:
    .RIGHT$numLines <- .RIGHT$numLines + 1
    
    # Add script in body:
    .RIGHT$scriptArray <- append(.RIGHT$scriptArray,
                                 c(paste0("var lineObj", .RIGHT$numLines,
                                          " = new MakeLineObj(", data, 
                                          ", '", axisName$x, "', '", axisName$y, "', ",
                                          createObject(group = by, alwaysObject = TRUE),");"),
                                   paste0("var line", .RIGHT$numLines,
                                          " = new Line(axis", .RIGHT$numAxis,
                                          ", lineObj", .RIGHT$numLines,
                                          ", 'x1', 'x2', 'y1', 'y2', ",
                                          createObject(baseColor = col, alwaysObject = TRUE), ");")))
  
  } else {
    
    .RIGHT$offIndex <- c(.RIGHT$offIndex, .RIGHT$numAxis)
    .RIGHT$offDataArr <- c(.RIGHT$offDataArr, .RIGHT$curDataObj)
    .RIGHT$offNameArr <- c(.RIGHT$offNameArr, data)
    
    .RIGHT$serverArray <- paste0(.RIGHT$serverArray, 
                                 "\n\toutput$", data, " <- reactive({ \n",
                                 "\t\tif (length(input$", .RIGHT$curDataObj, ") != 0) { \n",
                                 "\t\t\tif (length(input$", .RIGHT$curDataObj, ") > 1) { \n",
                                 "\t\t\t\t",.RIGHT$curDataObj, " <- .", .RIGHT$curDataObj, "[!input$", .RIGHT$curDataObj, ", ]\n",
                                 "\t\t\t\t",.RIGHT$exprArray[iData], "\n",
                                 "\t\t\t} else { \n",
                                 "\t\t\t\toutput <- list(-1, -1) \n",
                                 "\t\t\t\treturn (output) \n",
                                 "\t\t\t}\n\t\t}\n\t})")
    
    .RIGHT$serverScript <- paste0(.RIGHT$serverScript, 
                                  "var ", data," = createMainStructureE('", 
                                  .RIGHT$curDataObj, "');\n",
                                  "var loffObj", iData, 
                                  " = new MakeLineObj(", data, 
                                  ", '", axisName$x, "', '", axisName$y, "', ",
                                  createObject(group = by, alwaysObject = TRUE),");\n",
                                  "var loff", iData, 
                                  " = new Line(axis", .RIGHT$numAxis, ", loffObj", iData,
                                  ", 'x1', 'x2', 'y1', 'y2', ", 
                                  createObject(baseColor = col, alwaysObject = TRUE), ");\n")
  }
  
  invisible()
  
  # Source dot.js in head:
  addSource("line.js")
    
} # function lines_RIGHT
