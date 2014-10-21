#' @title Add Points to a Plot
#'
#' @description points_RIGHT draws a sequence of points in the current axis.
#' 
#' @param form a formula describing the x and y variables as y ~ x.
#' @param data a data.frame object.
#' @param isString a character is expected for \code{data} if \code{TRUE}. It is useful for programming.
#' 
#' @seealso \code{\link{points}}
#' 
#' @export
#' 
#' @examples
#' \donttest{
#' obj <- RIGHT({plot(conc ~ Time, Theoph, type = "n") # create blank axis
#'               points(conc ~ Time, Theoph)})
#' print(obj)
#' }
points_RIGHT <- function(form, data, isString = FALSE) {
  
  col <- NULL # TEMPORARY
  
  ## ---
  ## Take strings if asked:
  ## ---

  # Make sure that data exists:
  argArray <- as.list(match.call())
  
  if (!isString) {
    
    data <- if (is.null(argArray$data)) NULL else as.character(argArray$data)
    
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
  # CHECK (junghoon): is there a way to check whether form is a formula?
  axisName <- checkFormula_xy(form)
  checkColumnName(axisName$x, dataArray)
  checkColumnName(axisName$y, dataArray)
  
  # Check col option:
 
  checkCol(col)
  col <- getRGB(col)
  
  ## ---
  ## Plot points:
  ## ---
  
  # Keep name of the data object:
  .RIGHT$nameArray <- append(.RIGHT$nameArray, data)

  # Increment the number of points:
  .RIGHT$numPoints <- .RIGHT$numPoints + 1
  
  # Add script in body:
  .RIGHT$scriptArray <- append(.RIGHT$scriptArray,
                               paste0("var point", .RIGHT$numPoints,
                                      " = new Dot(axis", .RIGHT$numAxis,
                                      ", ", data,
                                      ", '", axisName$x, "', '", axisName$y, "', ",
                                      createObject(baseColor = col, alwaysObject = TRUE) ,");"))
  
  # Source dot.js in head:
  addSource("dot.js")
  
  invisible()
  
} # function point_RIGHT
