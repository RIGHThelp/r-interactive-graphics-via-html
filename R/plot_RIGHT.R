## plot_RIGHT.R

#' @title X-Y Plotting
#' 
#' @description Function to create x-y scatter and line plots, including the axis.
#' 
#' @param form a formula describing the x and y variables as y ~ x.
#' @param data a data.frame object.
#' @param type the type of plot. Currently, only "n", "b", "p", "l" are supported. See \code{\link{plot}} for more details.
#' @param by column used to group lines. Default is the same as \code{color}.
#' @param color column used to define line or point color. Default is NULL.
#' @param isString a character is expected for \code{data} and \code{color} if \code{TRUE}. It is useful for programming.
#' 
#' @seealso \code{\link{plot}}
#' 
#' @export
#' 
#' @examples
#' \donttest{
#' obj <- RIGHT(plot(conc ~ Time, Theoph, type = "b", color = Subject))
#' print(obj)
#' }
plot_RIGHT <- function(form, data, type = "b", by = color, color = NULL,
                       isString = FALSE) {

  # @param col color used for all the visual elements. color option overrides \code{col} option.
  col <- NULL # TEMPORARY
  offPlot <- FALSE
  
  ## ---
  ## Take strings if asked:
  ## ---
  
  argArray <- as.list(match.call())
  
  if (!isString) {
        
    for(iData in 1:.RIGHT$numServer) {
      if(is(data, paste0("RIGHTServer", iData))) {
        offPlot <- TRUE
        break
      } # if
    } # for
    
    if(!offPlot) {
      .RIGHT$curDataObj <- argArray$data
    } # if
    
    data <- if (is.null(argArray$data)) NULL else as.character(argArray$data)
    color <- if (is.null(argArray$color)) NULL else as.character(argArray$color)
    by <- if (is.null(argArray$by)) color else as.character(argArray$by) # CHECK (junghoon): is this the best way?
      
  } # if
  
  ## ---
  ## Check input arguments:
  ## ---
  
  # get is necessary in case a character string is given for data:
  if (!exists(data, envir = parent.frame())) {
    stop(data, " does not exist.")
  } # if
  dataArray <- get(data, envir = parent.frame(), inherits = TRUE)
  
  # Check whether the columns exist:
  axisName <- checkFormula_xy(form) 
  checkColumnName(axisName$x, dataArray)
  checkColumnName(axisName$y, dataArray)
  
  # Check by and color option:
  checkColumnName(color, dataArray)
  checkColumnName(by, dataArray)
  
  if (!is.null(color) && color != by) {
    stop("color and by should be the same.")
  } # if
  
  # col option is checked by points_RIGHT() or line_RIGHT().
  
  ## ---
  ## Create an axis:
  ## ---
  
  if(offPlot == FALSE) {
    # Keep name of the data object:
    .RIGHT$nameArray <- append(.RIGHT$nameArray, data)
  } # if
  
  # Increment the number of axes:
  .RIGHT$numAxis <- .RIGHT$numAxis + 1
  
  # Add div in body:
  .RIGHT$divArray <- append(.RIGHT$divArray, 
                            paste0('<div id="container', .RIGHT$numAxis,
                                   '" oncontextmenu="return false;"></div>'))
  
  if(offPlot == FALSE) {
    
    # Add script in body:
    .RIGHT$scriptArray <- append(.RIGHT$scriptArray,
                                 paste0("var axis", .RIGHT$numAxis,
                                        " = new Axis(", .RIGHT$numAxis, 
                                        ", ", data,
                                        ", '", axisName$x, "', '", axisName$y, 
                                        "', ", createObject(legend = color, alwaysObject = TRUE), ");"))
    ## ---
    ## Plot lines if necessary:
    ## ---
    
    if (type == "l" || type == "b") {
      lines_RIGHT(form, data, by = by, isString = TRUE)
    } # if
    
    ## ---
    ## Plot points if necessary:
    ## ---
    
    if (type == "p" || type == "b") {
      points_RIGHT(form, data, isString = TRUE)
    } # if
    
  } else {
    
    .RIGHT$offIndex <- c(.RIGHT$offIndex, .RIGHT$numAxis)
    .RIGHT$offDataArr <- c(.RIGHT$offDataArr, .RIGHT$curDataObj)
    .RIGHT$offNameArr <- c(.RIGHT$offNameArr, data)
    
    .RIGHT$scriptArray <- append(.RIGHT$scriptArray,
                                 paste0("var axis", .RIGHT$numAxis,
                                        " = new Axis(", .RIGHT$numAxis, 
                                        ", ", .RIGHT$curDataObj,
                                        ", '", axisName$x, "', '", axisName$y, 
                                        "', ", createObject(legend = color, alwaysObject = TRUE), ");", sep = ""))
    
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
                                  ", '", axisName$x, "', '", axisName$y, "', { });\n",
                                  "var loff", iData, 
                                  " = new Line(axis", .RIGHT$numAxis, ", loffObj", iData,
                                  ", 'x1', 'x2', 'y1', 'y2', { });\n")
    addSource("line.js")
    
  } # if
  
  invisible()
  
} # function plot_RIGHT
